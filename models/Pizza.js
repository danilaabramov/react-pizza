const mongoose = require("mongoose")

const PizzaSchema = new mongoose.Schema(
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
          required: true,
      },
      price: {
          type: Array,
          required: true,
      },
  }
)

module.exports = mongoose.model("Pizza", PizzaSchema)


