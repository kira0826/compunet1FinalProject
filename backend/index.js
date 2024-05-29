import express from "express";
import cors from "cors";
import path from "path";
import users from "./users/users.js";
import { fileURLToPath } from "url";
import PropertiesReader from "properties-reader";
import { products } from "./com/products.js";
import writeProductsToFile from './com/Writer.js';

//const sharp = import('sharp');
import multer from 'multer';


// fileURLToPath is used because we are using module ES.



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesPath = path.resolve(__dirname, "../config.properties");
import upload from './Storage/Storage.js'


const properties = PropertiesReader(propertiesPath);
const port = properties.get("app.port");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server listen in " + port);
  console.log("products", products);

});


//GET

app.get("/products", (req, res) => {
  //console.log("GET /products");
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log("GET /products/:id", id);

  const product = products.find((elem) => elem.id === Number(id));
  res.status(200).json({ product, message: "product successfully got." });
});

//POST

app.post('/products', upload.single('image'),(req, res) => {
    const {body} = req;
    //const image = './Storage/imgs' + req.file.originalname
    const newProduct = {
        id: products.length + 1, 
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
        //writeProductsToFile(products);
    }

    res.send({});

})
app.post("/login", (req, res) => {
  console.log("POST /login");

  const { password, email } = req.body;

  console.log(email, password);

  const user = users.find(
    (elem) => elem.email === String(email) && elem.password === String(password)
  );

  console.log(user);

  if (user) {
    console.log("melo", user);

    res.status(200).json({ user, message: "Login successful" }); // Send user object and "OK" message
  } else {
    console.log("NO melo", user);

    res.status(401).json({ message: "Invalid email or password" }); // Send error message
  }
});
//PATCH

app.patch("/products/:id", (req, res) => {
  console.log("PATCH /EditProduct");

  const { id } = req.params;
  const body = req.body;
  console.log("body", body);


  const productIndex = products.findIndex((elem) => elem.id === Number(id));

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const product = products[productIndex];


  for (const key in body) {
    product[key] = body[key];
  }
  res.status(200).json({message: "Login successful" });
  

});

//PUT

//DELETE  

app.delete("/products/:id", (req, res) => {

  const { id } = req.params;
  console.log("DELETE /products/:id", id);

  const productIndex = products.findIndex((elem) => elem.id === Number(id));

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }


  console.log("Antes", products);
  products.splice(productIndex, 1);
  console.log("Despues", products);

  res.status(200).json({ message: "Product successfully deleted" });

})