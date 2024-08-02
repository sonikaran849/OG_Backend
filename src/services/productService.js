const Category = require("../Models/categoryModel");
const Product = require("../Models/productModel");


async function createProduct(reqData){
    console.log(reqData.discountedPercent + ":6");
    let topLevel = await Category.findOne({name:reqData.topLevelCategory})
    console.log(reqData)
    if(!topLevel){
        topLevel = new Category({
            name:reqData.topLevelCategory,
            level:1
        })

        await topLevel.save();
    }

    let secondLevel = await Category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory:topLevel._id,
    })

    if(!secondLevel){
        secondLevel = new Category({
            name:reqData.secondLevelCategory,
            parentCategory:topLevel._id,
            level:2,
        })

        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name:reqData.thirdLevelCategory,
        parentCategory:secondLevel._id,
    })

    if(!thirdLevel){
        thirdLevel = new Category({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3,
        })

        await thirdLevel.save();
    }

    const product = new Product({
        title:reqData.title,
        description:reqData.description,
        price:reqData.price,
        color: reqData.color,
        discountedPrice:reqData.discountedPrice,
        discountPercent:reqData.discountedPercent,
        quantity:reqData.quantity,
        brand:reqData.brand,
        imageUrl:reqData.imageUrl,
        sizes:reqData.size,
        category:thirdLevel._id,
    })
    
    await product.save();
    console.log(product + ":61");
    return product;
}

async function deleteProduct(productId){
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product Deleted Successfully";
}

async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData);
}

async function findProductById(productId){
    const product = await Product.findById(productId)
    .populate("category").exec();
    
    if(!product){
        throw new Error("Product not found with id " + productId);
    }

    return product 
}

// Get all products with filtering and pagination
async function getAllProducts(reqQuery) {
    let {
      category,
      color,
      size,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = reqQuery;
    (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);
    let query = Product.find().populate("category");
    console.log(reqQuery)
  
    if (category) {
      const existCategory = await Category.findOne({ name: category });
      if (existCategory)
        query = query.where("category").equals(existCategory._id);
      else return { content: [], currentPage: 1, totalPages:1 };
    }
  
    if (color) {
      const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
      const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
      query = query.where("color").regex(colorRegex);
      // query = query.where("color").in([...colorSet]);
    }
  
    if (size) {
      const sizesSet = new Set(size);
      
      query = query.where("sizes.name").in([...sizesSet]);
      console.log(size)
    }
  
    if (minPrice && maxPrice) {
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }
  
    if (minDiscount) {
      query = query.where("discountPercent").gt(minDiscount);
    }
  
    if (stock) {
      if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock === "out_of_stock") {
        query = query.where("quantity").lte(0);
      }
    }
  
    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }
  
    // Apply pagination
    const totalProducts = await Product.countDocuments(query);
  
    const skip = (pageNumber - 1) * pageSize;
  
    query = query.skip(skip).limit(pageSize);
  
    const products = await query.exec();
  
    const totalPages = Math.ceil(totalProducts / pageSize);
  
  
    return { content: products, currentPage: pageNumber, totalPages:totalPages };
  }
  

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProduct
}