//initializes
const mongoose = require("mongoose");
const express = require("express");
const { Server } = require("socket.io");
const mqtt = require("mqtt");
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
const mqttClient = new mqtt.connect("mqtt://localhost:1883");
mqttClient.on("connect", function(){
  console.log("Service broker connected.");
});

mqttClient.on("message", function(topic, message){
  try{
    const socks = sockConnections.filter(s => s.trolleyId == topic)
    for(const sock of socks){
      io.sockets.sockets.get(sock.id).emit("onItem", String(message));
    }
    console.log(topic, String(message));
  }catch(err){

  }
});

// Socket connection
io.on("connection", (socket) => {
  socket.on("onTrolly", (trolley) => {
    console.log("Connected to Trolly", trolley);
    const _sock = sockConnections.find(s => s.trolleyId == trolley);
    if(_sock){
      _sock.id = socket.id;
      _sock.socket = socket;
    }else{
      sockConnections.push({id: socket.id, trolleyId: trolley, socket });
    }
    
    socket.emit("onTrolly", trolley);
    mqttClient.subscribe(trolley);
    // zab-e-mart-trolly-1
  });

  socket.on("disconnect", (reason) => {
    try{
      console.log("Disconnected from Trolly");   
      socket.emit("unplug", "disconnected");
      const trolleyId = sockConnections.find((s) => s.id !== socket.id)?.trolleyId;
      sockConnections =  sockConnections.filter(a => a.trolleyId == sockConnections.find((s) => s.id !== socket.id))?.trolleyId || [];
      mqttClient.unsubscribe(trolleyId);
    }catch(err){

    }
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
