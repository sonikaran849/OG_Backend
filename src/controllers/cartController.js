const cartService = require("../services/cartService");

const findUserCart= async(req,res)=>{
    try {
        //console.log(req,res);
        const user = req.user;
        //console.log(req,res);
        console.log(user);
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const addItemToCart= async(req,res)=>{
    const user = req.user;
    try {
        const cartItem = await cartService.addCartItem(user._id,req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}


module.exports = {
    findUserCart,
    addItemToCart,

}