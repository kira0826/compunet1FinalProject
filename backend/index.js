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
import { MongoClient,ServerApiVersion } from "mongodb";

// fileURLToPath is used because we are using module ES.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesPath = path.resolve(__dirname, "./config.properties");

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
const port = process.env.PORT || properties.get("app.port");

const uri = "mongodb+srv://yeisz0904:a7mVK8bGZVHcRPJz@finalprojectcluster.tsqooj9.mongodb.net/?retryWrites=true&w=majority&appName=finalProjectCluster"
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

connectDB();

const productsCollection = client.db("FinalProjectDatabase").collection("products");
const usersCollection = client.db("FinalProjectDatabase").collection("users");
const ordersCollection = client.db("FinalProjectDatabase").collection("orders");

app.listen(port, () => {
  console.log("Server listen in " + port);
});

//GET

app.get("/products", async (req, res) => {
  const products = await productsCollection.find().toArray();
  res.status(200).json(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("GET /products/:id", id);

  const product =  await productsCollection.findOne({ id: Number(id) });
  res.status(200).json({ product, message: "product successfully got." });
});

app.get("/orderHistory/:idUser", async (req, res) => {
  const { idUser } = req.params;
  console.log("GET /orderHistory/:idUser", idUser);

  const order = await ordersCollection.findOne({idUser : idUser});
  console.log("order", order);
  res.status(200).json({ order, message: "order successfully got." });
});

//POST

app.post("/products", upload.single("image"), async (req, res) => {
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
    await productsCollection.insertOne(newProduct);
  }

  res.send({});
});

app.post("/order", async (req, res) => {
  console.log("POST /order ESTOOOOY");
  const file = req.file;
  console.log("POST /orders", req.body);
  const { body } = req;

  const userOrders = await ordersCollection.findOne({idUser : body.idUser});
  
  const newIdOrder = userOrders? userOrders.orders.length : 0;

  const newOrder ={
    idOrder: newIdOrder,
    date: body.orders.date , // Fecha actual en formato YYYY-MM-DD
    products: body.orders.products
  };

  if (newOrder.products != null) {
    if (userOrders) {
      await ordersCollection.findOneAndUpdate(
        { idUser: body.idUser },
        { $push: { orders: newOrder } }
      );
    } else {
      await ordersCollection.insertOne({
        idUser: body.idUser,
        orders: [newOrder]
      });
    }
    
    res.status(201).json({ message: "order successfully created." });
  }
});

app.post("/login", async (req, res) => {
  console.log("POST /login");

  const { password, email } = req.body;

  const user = await usersCollection.findOne({ email });


  console.log(user);

  if (user && user['password']=== password) {
    console.log("melo", user);

    res.status(200).json({ user, message: "Login successful" }); // Send user object and "OK" message
  } else {
    console.log("NO melo", user);

    res.status(401).json({ message: "Invalid email or password" }); // Send error message
  }
});

app.post("/register", async (req, res) => {
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

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  await usersCollection.insertOne(newUser);

  console.log("Usuario registrado:", newUser);

  res.status(201).json({ message: "Usuario registrado exitosamente" });
});
//PATCH

app.patch("/products/:id", upload.single("image"), async (req, res) => {
  console.log("PATCH /EditProduct");

  const { id } = req.params;
  const body = req.body;
  console.log("body", body);

  const product = await productsCollection.findOne({ id: Number(id) });
  try {
    const result = await productsCollection.updateOne(
      { id: Number(id) },
      { $set: body }
    );
    if (result.matchedCount > 0) {
      const product = await productsCollection.findOne({ id: Number(id) });
      res.status(200).json({ product, message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

//PUT

//DELETE

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("DELETE /products/:id", id);

  try {
    const result = await productsCollection.deleteOne({ id: Number(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});
