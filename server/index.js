const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const createPostRoutes = require("./routes/createPostRoutes");
const path = require("path");
const { fileURLToPath } = require("url");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// login and register routes
app.use("/api/auth", userRoutes);

// posts routes
app.use("/api/posts", createPostRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const server = app.listen(PORT, () => {
  console.log(`server is started on port ${PORT} successfully`);
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
