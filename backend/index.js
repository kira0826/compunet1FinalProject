import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import PropertiesReader from "properties-reader";
import { products } from "./com/products.js";
import { orders } from "./com/OrderHistorials.js";
import writeSomethingToFile from "./com/Writer.js";
import { users } from "./users/users.js";
import multer from "multer";

// fileURLToPath is used because we are using module ES.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesPath = path.resolve(__dirname, "../config.properties");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//import upload from "./Storage/Storage.js";



const userFileInfo = {
  path: `./users/users.js`,
  variableName: `users`,
};
const productsFileInfo = {
  path: `./com/products.js`,
  variableName: `products`,
};

const ordersFileInfo = {
  path: `./com/OrderHistorials.js`,
  variableName: `orders`,
};

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

app.get("/orderHistory/:idUser", (req, res) => {
  const { idUser } = req.params;
  console.log("GET /orderHistory/:idUser", idUser);

  const order = orders.find((elem) => elem.idUser === idUser);
  console.log("order", order);
  res.status(200).json({ order, message: "order successfully got." });
});

//POST

app.post("/products", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log("POST /products", req.body);
  const { body } = req;
  const newProduct = {
    id: products.length + 1,
    stock: body.stock,
    image: body.image,
    discount: body.discount,
    category: body.category,
    brand: body.brand,
    name: body.name,
    price: body.price,
    description: body.description,
  };
  console.log("newProduct", newProduct);
  if (newProduct.name != null) {
    products.push(newProduct);
    writeSomethingToFile(
      productsFileInfo.path,
      productsFileInfo.variableName,
      products
    );
  }

  res.send({});
});

app.post("/order", (req, res) => {
  console.log("POST /order ESTOOOOY");
  const file = req.file;
  console.log("POST /orders", req.body);
  const { body } = req;

  const newIdOrder = orders.find((elem) => elem.idUser === body.idUser).orders.length + 1;

  const newOrder = {
    idOrder: newIdOrder,
    date: body.orders.date , // Fecha actual en formato YYYY-MM-DD
    products: body.orders.products
  };

  if (newOrder.products != null) {
    orders.find((elem) => elem.idUser === body.idUser).orders.push(newOrder);
    writeSomethingToFile(ordersFileInfo.path,ordersFileInfo.variableName,orders);
    res.status(201).json({ message: "order successfully created." });
  }
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

  writeSomethingToFile(userFileInfo.path, userFileInfo.variableName, users);

  console.log("Usuario registrado:", newUser);

  res.status(201).json({ message: "Usuario registrado exitosamente" });
});
//PATCH

app.patch("/products/:id", upload.single("image"), (req, res) => {
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
    //console.log("key", key ,body[key]);
  }

  products[productIndex] = product;
  console.log("Despues", products[productIndex]);
  writeSomethingToFile( productsFileInfo.path, productsFileInfo.variableName, products);
  res.status(200).json({ message: "Product successfully updated" });
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

  products.splice(productIndex, 1);
  writeSomethingToFile(
    productsFileInfo.path,
    productsFileInfo.variableName,
    products
  );

  console.log("Despues", products);

  res.status(200).json({ message: "Product successfully deleted" });
});
