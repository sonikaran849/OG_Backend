const express = require("express");
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    return res.status(200).send({
        msg: "Welcome to lauda ka Sarkar"
    })
})

const authRouters = require("./Routes/authRoute");
app.use("/auth",authRouters);

const userRouters = require("./Routes/userRoute");
app.use("/api/users",userRouters);

const productRouters = require("./Routes/productRoute");
app.use("/api/products",productRouters);

const adminProductRouters = require("./Routes/adminProductRoute");
app.use("/api/admin/products",adminProductRouters);

const cartRouters = require("./Routes/cartRoute");
app.use("/api/cart",cartRouters);

const cartItemRouters = require("./Routes/cartItemRoute");
app.use("/api/cartItem",cartItemRouters);

const orderRouters = require("./Routes/orderRoutes");
app.use("/api/orders",orderRouters);

const adminOrderRouters = require("./Routes/adminRoute");
app.use("/api/admin/orders",adminOrderRouters);


const reviewRouters = require("./Routes/reviewRoute");
app.use("/api/reviews",reviewRouters);

const ratingRouters = require("./Routes/ratingRoute");
app.use("/api/ratings",ratingRouters);

const paymentRouters = require("./Routes/paymentRoute");
app.use("/api/payments",paymentRouters);


module.exports = app;