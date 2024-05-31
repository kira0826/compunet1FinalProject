import express from "express";
import cors from "cors";
import path from "path";
import products from "./com/products.js";
import users from "./users/users.js";
import { fileURLToPath } from "url";
import PropertiesReader from "properties-reader";

// fileURLToPath is used because we are using module ES.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesPath = path.resolve(__dirname, "../config.properties");

const properties = PropertiesReader(propertiesPath);
const port = properties.get("app.port");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server listen in " + port);
});

//GET

app.get("/products", (req, res) => {
  //console.log("GET /products");
  res.status(200).json(products);
});


app.get("/products/:id", (req, res) => {

  const { id } = req.params
  console.log("GET /products/:id", id);

  const product = products.find((elem) => elem.id === Number(id))
  res.status(200).json({product, message: "product successfully got." })


})



//POST
app.post("/login", (req, res) => {

    console.log("POST /login");
  
    const { password, email } = req.body;
    
    console.log(email,password)

    const user = users.find(
      (elem) => elem.email === String(email) && elem.password === String(password)
    );

    console.log(user)
    
    if (user) {
        console.log("melo",user)

      res.status(200).json({ user, message: "Login successful" }); // Send user object and "OK" message
    } else {
        console.log("NO melo",user)

      res.status(401).json({ message: "Invalid email or password" }); // Send error message
    }
  });

//PATCH

//PUT
app.put("/products/:id", (req, res) => {
  const { id } = req.params;

  console.log("PUT /products/:id", id)

  const updatedProduct = req.body;

  console.log("producto upd: " + updatedProduct.stock)

  const productIndex = products.findIndex((elem) => elem.id === Number(id));

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.status(200).json({ product: products[productIndex], message: "Product successfully updated." });
  } else {
    res.status(404).json({ message: "Product not found." });
  }
})
