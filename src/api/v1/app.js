const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { errorHandler } = require("./middlewares/errorHandler.middleware");

const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use("/api/v1", api);
app.use(errorHandler)

module.exports = app;
