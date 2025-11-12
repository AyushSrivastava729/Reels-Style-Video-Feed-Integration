const foodPartnerModel = require("../models/food-partner.model")
const userModel=require("../models/user.model")
const jwt = require("jsonwebtoken");


async function authFoodPartnerMiddleware(req, res, next) {
    // to check whether token is present or not, and if not present then user has not registered and has not login
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "Please login first"
        })
    }
    try {
        // verifies the token whether it is correct or not
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // with the help of food partner id we will get the food partner details from the DB

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        //setting the data of foodpartner in req.foodpartner
        req.foodPartner = foodPartner
        // with the help of next the controller present after the middleware receives the logic
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}


module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}