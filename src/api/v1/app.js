const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const {
  errorHandler,
} = require("./globals/middlewares/errorHandler.middleware");

const api = require("./api");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", api);
app.use(errorHandler);

module.exports = app;
