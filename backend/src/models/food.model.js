const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // we will store URL of the video not the video file in the DB.And video file will be stored in the local cloud storage provider
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    },
     likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.model("food", foodSchema)

module.exports = foodModel;