const mongoose = require("mongoose")

const AnalyticPizzaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        },
    }
)

module.exports = mongoose.model("AnalyticPizza", AnalyticPizzaSchema)
