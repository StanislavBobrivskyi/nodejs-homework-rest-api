const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://BobrivskyiStanislav:bober237BoBer93012716511@cluster0.splryg6.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Database connection error:", error);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});

// Решта коду для схеми, моделі та функцій обробки запитів залишається незмінним

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
