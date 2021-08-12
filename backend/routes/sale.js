const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/sale");

router.post("/registerSale" , SaleController.registerSale);
router.get("/listSale" , SaleController.listSale);

module.exports = router;