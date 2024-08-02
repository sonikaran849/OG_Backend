const app = require(".");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5454;

app.listen(PORT, async()=>{
    await connectDB();
    console.log("ecommerce api listen on Port : ",PORT);
})
