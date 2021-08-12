const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const User = require("./routes/user");
const Product = require("./routes/product");
const Stock = require("./routes/stock");
const Sale = require("./routes/sale");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user" ,User);
app.use("/api/product" ,Product);
app.use("/api/stock" , Stock);
app.use("/api/sale" ,Sale);
app.listen(process.env.PORT, () =>
    console.log("Backend server running OK, on PORT:" , process.env.PORT)
);

dbConnection();