const express = require("express");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { connectToDb, db } = require("./db");

const app = express();
const port = 3000;

const uri = "mongodb://127.0.0.1:27017";
const dbName = "Web71_MindX";
const secretKey = "Web71_MindX";

app.use(bodyParser.json());

app.get("/products", authenticateJWT, async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection("inventories");

    const lowQuantity = req.query.lowQuantity === "true";
    const query = lowQuantity ? { quantity: { $lt: 100 } } : {};

    const products = await collection.find(query).toArray();

    res.json(products);
  } finally {
    await client.close();
  }
});

app.get("/orders", authenticateJWT, async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(dbName);
    const ordersCollection = database.collection("orders");
    const inventoriesCollection = database.collection("inventories");

    // Lấy danh sách đơn đặt hàng
    const orders = await ordersCollection.find().toArray();

    // Lấy mô tả sản phẩm cho mỗi đơn đặt hàng
    const ordersWithProductDescription = await Promise.all(
      orders.map(async (order) => {
        const product = await inventoriesCollection.findOne({
          _id: order.productId,
        });
        return {
          _id: order._id,
          item: product.item,
          price: product.price,
          quantity: order.quantity,
        };
      })
    );

    res.json(ordersWithProductDescription);
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ username, password });

    if (user) {
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } finally {
    await client.close();
  }
});

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`App is running at ${port}`);
  connectToDb();
});
