const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const { sendError } = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const stripeRoutes = require("./routes/stripeRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const { uploadSample } = require("./sampleScript");

require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.enable("trust proxy");

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((err, req, res, next) => {
  sendError(err, res);
});

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database!!!"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
