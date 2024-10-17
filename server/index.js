require("dotenv").config();
const express = require("express");
const router = require("./routes/api.js");
const connectDB = require("./db/connect.js");
const session = require("express-session");
const cors = require("cors");

const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Add a secret key in your .env file
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day session expiration
    },
  })
);

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
