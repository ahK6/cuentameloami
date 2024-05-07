// Importa Express
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/talktome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crea una instancia de la aplicación Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", require("./app/users/routes/users.route"));
app.use("/chat", require("./app/messages/routes/messages.route"));

// Ruta de ejemplo

// Puerto en el que el servidor escuchará
const port = 3000;

// Inicia el servidor y hazlo escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
