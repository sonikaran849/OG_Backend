const cartItem = require("../Models/cartItem");
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");

async function createCart(user){
    try {
        const cart = new Cart({user});
        const createdCart = cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId){
    try {
        let cart =await Cart.findOne({ user: userId })
        
        let cartItems=await cartItem.find({cart:cart._id}).populate("product")

        cart.cartItems=cartItems
        

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (const cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discount = totalPrice - totalDiscountedPrice;
            
        await cart.save();
        return cart;
    }
        catch (error) {
            throw new Error(error.message);
        }
}

async function addCartItem(userId,req){

    try {
        const cart = await Cart.findOne({user:userId});
        const product = await Product.findById(req.productId);

        const isPresent = await cartItem.findOne({cart:cart._id,product:product._id,userId});

        if(!isPresent){
            const cartitem = new cartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice,
            })

            const createdCartItem = cartitem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();    
        }
        return 'Item added to cart';
    } catch (error) {
        throw new Error(error.message);
    }
    
}

module.exports = {createCart,findUserCart,addCartItem};