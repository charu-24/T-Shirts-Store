require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentB");
const { portt } = require("./client/src/backend1");

//DB Connection
mongoose
  .connect( process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
// app.use(express.static(path.join(__dirname, "client", "build")))




// //PORT
// // const port = process.env.PORT || 8000;

// app.get("*", (req, res) =>{
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"))
// })
//Starting a server
app.listen(portt, () => {
  console.log(`app is running at ${portt}`);
});
