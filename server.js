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

var sockConnections = [];

// Socket connection
io.on("connection", (socket) => {
  socket.on("onTrolly", (trolley) => {
    console.log("Connected to Trolly", trolley);
    sockConnections.push({id: socket.id, trolleyId: trolley, socket });
    socket.emit("onTrolly", trolley);
  });

  socket.on("onItemAdded", (item) => {
    const clients = sockConnections
    .filter(s => s.trolleyId == item.trolleyId)
    for(const sock of clients){
      sock?.socket.emit("onItemAdded", item)
    }
  });

  socket.on("onItemRemoved", (item) => {
    const clients = sockConnections
    .filter(s => s.trolleyId == item.trolleyId)
    for(const sock of clients){
      sock?.socket.emit("onItemRemoved", item)
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected from Trolly");   
    sockConnections =  sockConnections.filter(a => a.trolleyId == sockConnections.find((s) => s.id !== socket.id))?.trolleyId || [];
    socket.emit("unplug", "disconnected");
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
