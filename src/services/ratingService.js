const Rating = require("../Models/ratingModel");
const productService = require("../services/productService");

async function createRating(req,user){
    const product = await productService.findProductById(req.productId);

    const rating = new Rating({
        user:user._id,
        product:product._id,
        rating:req.rating,
        createdAt:new Date(),
    })

    return await rating.save();
}

async function getProductRating(productId){
    return await Rating.find({product:productId});
}

module.exports = {
    createRating,
    getProductRating,
}