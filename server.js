//initializes
const mongoose = require("mongoose");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { createServer } = require("http");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

//app
const app = express();
const server = createServer(app);
const io = new Server(server);
//port
const port = process.env.PORT || 6400;

//routes
const productRoute = require("./routes/product");
const homeRoute = require("./routes/home");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.disable("view cache");

app.use("/", homeRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

const sockConnections = [];

// Socket connection
io.on("connection", (socket) => {
  socket.on("onTrolly", (trolly) => {
    sockConnections.push(socket);
  });

  socket.on("onItemAdded", (item) => {
    console.log("onItemAdded", item);
  });

  socket.on("onItemRemoved", (item) => {
    console.log("onItemRemoved", item);
  });

  socket.on("disconnect", () => {
    sockConnections = sockConnections.filter((s) => s.id !== socket.id);
  });
});

//mongoose
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    server.listen(port, () => {
      console.log("connect");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
