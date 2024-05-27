import express from 'express'
import cors from 'cors'
import path from 'path';
import products from './com/products.js'
import { fileURLToPath } from 'url';
import PropertiesReader from 'properties-reader'

// fileURLToPath is used because we are using module ES.

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const propertiesPath = path.resolve(__dirname, '../config.properties')


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

//PATCH

//PUT



