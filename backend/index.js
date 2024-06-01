import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import PropertiesReader from "properties-reader";
import { products } from "./com/products.js";
import writeSomethingToFile from "./com/Writer.js";
import { users } from "./users/users.js";

// fileURLToPath is used because we are using module ES.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesPath = path.resolve(__dirname, "../config.properties");
import upload from "./Storage/Storage.js";
const userFileInfo = {
  path: `./users/users.js`,
  variableName: `users`,
}
const productsFileInfo = {
  path: `./com/products.js`,
  variableName: `products`,
}

const properties = PropertiesReader(propertiesPath);
const port = properties.get("app.port");
const url = properties.get("app.url");

const app = express();
app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log("Server listen in " + port);
});

//GET

app.get("/products", (req, res) => {
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
    const file = req.file;
    console.log("POST /products", req.body);
    const {body} = req;
    const newProduct = {
        id: products.length + 1, 
        stock: body.stock,
        image: body.image,
        discount: body.discount,
        category: body.category,
        brand: body.brand,
        name: body.name,
        price: body.price,
        description: body.description
    };
    console.log("newProduct", newProduct);
    if (newProduct.name != null){
        products.push(newProduct);
        writeSomethingToFile(productsFileInfo.path, productsFileInfo.variableName, products);
    }

  res.send({});
});
app.post("/login", (req, res) => {
  console.log("POST /login");

  const { password, email } = req.body;

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

app.post("/register", (req, res) => {
  const { name, email, password, confirmPass } = req.body;
  const [firstName, lastName] = String(name).split(" ");

  if (!name || !email || !password || !confirmPass) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  if (password !== confirmPass) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  const existingUser = users.find((elem) => elem.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  users.push(newUser);
  writeSomethingToFile( userFileInfo.path, userFileInfo.variableName, users);

  console.log("Usuario registrado:", newUser);

  res.status(201).json({ message: "Usuario registrado exitosamente" });
});

//PATCH

app.patch("/products/:id", upload.single('image'), (req, res) => {
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
    console.log("key", key ,body[key]);
  }

  products[productIndex] = product;
  console.log("Despues", products[productIndex]);
  //writeSomethingToFile( productsFileInfo.path, productsFileInfo.variableName, products);

  res.status(200).json({ message: "Login successful" });
});

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


//DELETE

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log("DELETE /products/:id", id);

  const productIndex = products.findIndex((elem) => elem.id === Number(id));

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  products.splice(productIndex, 1);
  writeSomethingToFile( productsFileInfo.path, productsFileInfo.variableName, products);

  console.log("Despues", products);

  res.status(200).json({ message: "Product successfully deleted" });
});
