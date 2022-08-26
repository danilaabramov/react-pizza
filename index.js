const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const pizzaRoute = require("./routes/pizzas");
const orderRoute = require("./routes/orders");
const analyticPizzaRoute = require("./routes/analyticpizzas");
const cors = require("cors")

dotenv.config();
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb+srv://danila:1234qwer@cluster0.wiw6q.mongodb.net/react-pizza?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/orders", orderRoute);
app.use("/api/analyticpizzas", analyticPizzaRoute);

app.listen("5002", () => {
  console.log("Backend is running.");
});
