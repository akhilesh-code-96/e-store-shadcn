require("dotenv").config();
const express = require("express");
const router = require("./routes/api.js");
const connectDB = require("./db/connect.js");
const session = require("express-session");
const cors = require("cors");
const helmet = require('helmet');

const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: ["https://twirl-one.app", "http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// enforcing csp
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", "https://vercel.live"],
        // Add other directives as needed
    },
}));

// parse json files
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
