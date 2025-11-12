const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();

/*/api/food-partner/:id [protected] this api is for food-partner to get their profile information*/
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById
)

module.exports = router;