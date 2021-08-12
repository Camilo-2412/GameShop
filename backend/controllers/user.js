const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req,res)  =>{
    if(!req.body.name || !req.body.email || !req.body.password) return res.status(400).send("Process failed: Incomplete data");

    let existingEmail = await User.findOne({email: req.body.email});
    if(existingEmail) return res.status(400).send("Email already register");

    let hash = await bcrypt.hash(req.body.password,10);

    let user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hash,
        dbStatus: true,
    })

    let result = user.save();
    if(!result) return res.status(400).send("Failed to register user *");

    try {
        let jwt = user.generateJWT();
        return res.status(200).send({jwt});
    } catch (error) {   
        return res.status(400).send("Failed to register user")
    }
};

const listUser = async(req,res) =>{
    let user = await User.find({name: new RegExp(req.params["name"] ,"i")});

    if(!user || user.length ==="" ) return res.status(400).send("No users");
    return res.status(200).send({user});
};

module.exports = { registerUser, listUser};