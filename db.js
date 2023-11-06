// const { MongoClient } = require("mongodb");

// const db = {};

// const connectToDb = () => {
//   const client = new MongoClient("mongodb://localhost:27017");
//   client.connect(() => {
//     const database = client.db("your_db_name");
//     db.inventories = database.collection("inventories");
//     db.orders = database.collection("orders");
//     db.users = database.collection("users");
//   });
// };

// module.export = { connectToDb, db };

const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  client.connect(async (err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      return;
    }

    const database = client.db("Web71_MindX");

    // Insert data into 'inventories' collection
    const inventoryData = [
      { _id: 1, sku: "almonds", description: "product 1", instock: 120 },
      { _id: 2, sku: "bread", description: "product 2", instock: 80 },
      { _id: 3, sku: "cashews", description: "product 3", instock: 60 },
      { _id: 4, sku: "pecans", description: "product 4", instock: 70 },
    ];
    await database.collection("inventories").insertMany(inventoryData);

    // Insert data into 'orders' collection
    const orderData = [
      { _id: 1, item: "almonds", price: 12, quantity: 2 },
      { _id: 2, item: "pecans", price: 20, quantity: 1 },
      { _id: 3, item: "pecans", price: 20, quantity: 3 },
    ];
    await database.collection("orders").insertMany(orderData);

    // Insert data into 'users' collection
    const userData = [
      { username: "admin", password: "MindX@2022" },
      { username: "alice", password: "MindX@2022" },
    ];
    await database.collection("users").insertMany(userData);

    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");

    console.log("Data imported successfully.");

    // You can close the connection after importing the data if needed
    // client.close();
  });
};

module.exports = { connectToDb, db };
