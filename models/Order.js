const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        address: {
            type: Object,
            required: false,
        },
        products: {
            type: Array,
            required: false,
        },
        status: {
            type: String,
            default: "Собирается",
        },
        coins: {
            type: Number,
            default: 0,
        }
    }
);

module.exports = mongoose.model("Order", PostSchema);
