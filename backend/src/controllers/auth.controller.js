const userModel = require("../models/user.model")
const foodPartnerModel=require("../models/food-partner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {


    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }
    /* if user doesn't exists then create user and for creating user we need to hash the password because in case DB breaches(i.e,.all data of db leakes(user,product,foodpartner etc) in this condition also the privacy of the user is being protected i.e., the account of the user is being protected that's why we need to hash the password) and library to passwordf hash is
    bcryptjs and command for it is - npm i bcryptjs */

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    /*
    User technically is being registered,but next time when user requests
    on our server we should know from where the request is coming.So for this we create tokens and save it in the cookies
    package for token-json webtoken
    to save token in the cookies we need on more package- cookie-parser
    command - npm i jsonwebtoken cookie-parser
    */

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

   res.cookie("token", token, {
    httpOnly: true,      // JS cannot access it
    secure: true,        // required for HTTPS
    sameSite: "none",    // required for cross-origin requests
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});


    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }


    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
    httpOnly: true,      // JS cannot access it
    secure: true,        // required for HTTPS
    sameSite: "none",    // required for cross-origin requests
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});


    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

async function registerFoodPartner(req,res){

    const{name,email,password,phone,address,contactName}=req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food Partner Account Already Exists"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const foodPartner=await foodPartnerModel.create({
        name,
        email,
       password: hashedPassword,
       phone,
       address,
       contactName
    })
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)

res.cookie("token", token, {
    httpOnly: true,      // JS cannot access it
    secure: true,        // required for HTTPS
    sameSite: "none",    // required for cross-origin requests
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});

    
    res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address:foodPartner.address,
            phone:foodPartner.phone,
            contactName:foodPartner.contactName
        }
    })

}

async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,      // JS cannot access it
    secure: true,        // required for HTTPS
    sameSite: "none",    // required for cross-origin requests
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});


    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}
