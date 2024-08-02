const cartItem = require("../Models/cartItem");
const userService = require("../services/userService")

async function updateCartItem(userId, cartItemId, cartItemData){
    //console.log(userId,cartItemId, cartItemData);
    try {
        const item = await findCartItemById(cartItemId);
        const user = await userService.findUserById(item.userId);
        
        if(!item){
            throw new Error("cart item not found : ",cartItemId);
        }
        if(!user){
            throw new Error("User not found : ",userId);
        }

        if(user._id.toString() === userId.toString()){
            item.quantity = cartItemData.quantity;
            item.price = item.quantity*item.product.price;
            item.discountedPrice = item.quantity*item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        }
        else{
            throw new Error("You can't update this cart item");
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId,cartItemId){
    const CartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if(user._id.toString() === CartItem.userId.toString()){
        await cartItem.findByIdAndDelete(cartItemId);
    }
    else{
        throw new Error("you can't remove another user's item");
    }

}

async function findCartItemById(cartItemId){
    const CartItem = await cartItem.findById(cartItemId).populate("product");
    if(CartItem){
        return CartItem;
    }else{
        throw new Error("Cart Item not found with id: ",cartItemId);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById,
};