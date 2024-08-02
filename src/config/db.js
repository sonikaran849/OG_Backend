const mongoose  = require("mongoose")

const mongodbUrl = "mongodb+srv://karansoni7973:B%40b%40Lsoni7973@cluster0.r7r6p0b.mongodb.net/OGdatabase?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = ()=>{
    return mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {connectDB};