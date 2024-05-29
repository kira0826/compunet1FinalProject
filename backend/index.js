import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import PropertiesReader from "properties-reader";
import { products } from "./com/products.js";
import { users } from "./users/users.js";

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
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log("GET /products/:id", id);

  const product = products.find((elem) => elem.id === Number(id));
  res.status(200).json({ product, message: "product successfully got." });
});

//POST
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
  console.log("POST /register");
  console.log("req.body", req.body);

  const { name, email, password, confirmPass } = req.body;


  const [ firstName, lastName ] = String(name).split(" ");

  console.log("firstName", firstName);  
  console.log("last", lastName);  

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
    firstName: lastName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPass: confirmPass,
  };

  console.log("ANtes del push", users);
  users.push(newUser);
  console.log("Despues del push", users);

  console.log("Usuario registrado:", newUser);

  res.status(201).json({ message: "Usuario registrado exitosamente" });
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
  res.status(200).json({ message: "Login successful" });
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
});
