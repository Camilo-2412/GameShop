const Sale = require("../models/sale");
const Product = require("../models/product");
const User = require("../models/user");

const registerSale = async(req,res) =>{
    if(!req.body.code || !req.body.email) return res.status(400).send("Incomplete data");

    let product = await Product.findOne({code: req.body.code});
    if(!product) return res.status(400).send("No product was assigned");

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("No user was assigned");

    let sale = new Sale({
        productId: product._id,
        userId: user._id,
        price: product.price,
    });

    let result = await sale.save();
    if(!result) return res.status(400).send("Failed to register sale");
    return res.status(200).send({sale});
};

const listSale = async(req,res) =>{
    let sale = await Sale.find().populate("productId").populate("userId").exec();
    if(!sale || sale.length==="" ) return res.status(400).send("Failed to register sale");
    return res.status(200).send({sale});
};

module.exports = {registerSale, listSale};