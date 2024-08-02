const mongoose  = require("mongoose")



const connectDB = ()=>{
    return mongoose.connect(process.env.mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {connectDB};