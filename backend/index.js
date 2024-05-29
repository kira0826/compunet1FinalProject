import express from 'express'
import cors from 'cors'
import path from 'path';
import products from './com/products.js'
import { fileURLToPath } from 'url';
import PropertiesReader from 'properties-reader'
import writeProductsToFile from './com/Writer.js';

//const sharp = import('sharp');
import multer from 'multer';


// fileURLToPath is used because we are using module ES.



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const propertiesPath = path.resolve(__dirname, '../config.properties')
import upload from './Storage/Storage.js'


const properties = PropertiesReader(propertiesPath)
const port = properties.get("app.port")

const app = express()
app.use(express.json())
app.use(cors())

app.listen(port, ()=>{

    console.log("Server listen in " + port)

})

//GET

app.get('/products', (req, res) => {

    console.log("GET /products")
    res.json(products)

})
//POST

app.post('/products', upload.single('image'),(req, res) => {
    const {body} = req;
    //const image = './Storage/imgs' + req.file.originalname
    const newProduct = {
        id: body.sku, 
        stock: body.stock,
        image: "./Storage/imgs/" + body.image,
        discount: body.discount,
        category: body.category,
        brand: body.brand,
        name: body.name,
        price: body.price,
        description: body.description
    };

    if (newProduct.id != null){
        products.push(newProduct);
        writeProductsToFile(products);
    }

    res.send({});

})

//PATCH

//PUT



