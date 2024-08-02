const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const cartService = require("../services/cartService");

const register = async (req,res)=>{
    try {
        const user = await userService.createUser(req.body);

        const jwt = await jwtProvider.generateToken(user._id); 

        await cartService.createCart(user);
        return res.status(200).send({jwt,message:"Register Success"})
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userService.findUserByEmail(email);

        if(!user){
            res.status(404).send({message: "User not found with email",email});
        }
        
        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
            res.status(401).send({message:"Invalid Password.."});
        }
        const jwt = await jwtProvider.generateToken(user._id);
        return res.status(200).send({jwt,message:"Login Successful"});
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {login,register};