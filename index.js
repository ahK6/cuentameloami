// Importa Express
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(cors()); // Agrega el middleware CORS
const socketEvents = require("./app/sockets/socketEvents");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // Origen permitido
    methods: ["GET", "POST"],
  },
});
const sockets = require("./app/sockets/socketEvents")(io);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/talktome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crea una instancia de la aplicación Express

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", require("./app/users/routes/users.route"));
app.use("/chat", require("./app/rooms/routes/rooms.route"));
app.use("/reports", require("./app/reports/routes/reports.route"));
app.use("/posts", require("./app/posts/routes/posts.route"));
app.use("/comments", require("./app/comments/routes/comments.route"));
app.use("/likes", require("./app/likes/routes/likeComments.route"));

// Ruta de ejemplo

// Puerto en el que el servidor escuchará
const port = 3000;

// Inicia el servidor y hazlo escuchar en el puerto especificado
server.listen(port, "192.168.1.5", () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
