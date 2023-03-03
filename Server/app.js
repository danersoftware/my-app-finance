const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:4200",
};

const userRouter = require("./routes/userRoutes");
const fileRouter = require("./routes/file.router");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(corsOptions());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/ftp", fileRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
