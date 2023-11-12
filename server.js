const app = require("./app");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://bobrivskyistanislav1:bober237BoBer93012716511@contacts.bnx4wwj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {});

async function startServer() {
  try {
    // З'єднання з базою даних MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Запуск веб-сервера після успішного з'єднання з базою даних
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
