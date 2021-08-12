const Stock = require("../models/stock");
const Product = require("../models/product");

const registerStock = async(req,res) =>{
    if(!req.body.amount || !req.body.address ||!req.body.code) return res.status(400).send("Incomplete data");

    let product = await Product.findOne({code: req.body.code});
    if(!product) return res.status(400).send("No product was assigned");

    let existingStock = await Stock.findOne({productId: product._id  });
    if(existingStock) return res.status(400).send("Stock already exists");

    let stock = new Stock({
        productId: product._id,
        amount: req.body.amount,
        address: req.body.address,
        dbStatus: true,
    });

    let result = stock.save();
    if(!result) return res.status(400).send("Failed to register stock");
    return res.status(200).send({stock});
};

const listStock = async(req,res) =>{
    let stock = await Stock.find().populate("productId").exec();
    if(!stock || stock.length ==="") return res.status(400).send("No stock");
    return  res.status(200).send({stock});
};

module.exports = {registerStock, listStock};