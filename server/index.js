require("dotenv").config();
const express = require("express");
const router = require("./routes/api.js");
const connectDB = require("./db/connect.js");

const PORT = process.env.port || 3000;

const app = express();
app.use(express.json());

app.use("/api", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
