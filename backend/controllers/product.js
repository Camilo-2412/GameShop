const Product = require("../models/product");

const registerProduct = async (req,res) =>{
    if(!req.body.name || !req.body.price || !req.body.code ) return res.status(400).send("Incomplete data");

    let existingCode = await Product.findOne({code: req.body.code});
    if(existingCode) return res.status(400).send("Code already register");

    let product = new Product({
        name:req.body.name,
        price: req.body.price,
        code: req.body.code,
        description: req.body.description,
        dbStatus: true,
    });

    let result = await product.save();
    if(!result) return res.status(400).send("Failed to register product");
    return res.status(200).send({product});
};


const listProduct = async (req,res) =>{
    let product = await Product.find({code: new RegExp(req.params["code"] ,"i")});
    if(!product || product.length ==="") return res.status(400).send("No products");
    return res.status(200).send(product);
};

module.exports = { registerProduct, listProduct};