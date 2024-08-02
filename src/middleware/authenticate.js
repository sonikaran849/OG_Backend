const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/userService");

const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).send({error:"token not found"});
        }

        const userId = jwtProvider.getUserIdByToken(token);
        const user = await userService.findUserById(userId);
        req.user = user;
    } catch (error) {
        return res.status(500).send({error:error.message});
    }

    next();
}

module.exports = {authenticate};