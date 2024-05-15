const {
  createChat,
  joinToChat,
} = require("../messages/controllers/messages.controller");

module.exports = function (io, users) {
  io.on("connection", (socket) => {
    let users = {};
    console.log("Usuario conectado");

    console.log("users");
    /* 
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
      // Si el usuario estaba en una sala, lo sacamos de ella
      if (socket.room) {
        socket.leave(socket.room);
        io.to(socket.room).emit("user left", socket.username);
      }
      // Eliminar al usuario de la lista de usuarios
      delete users[socket.username];
    });

    // Manejar el evento de inicio de sesión de usuario
    socket.on("login", (username) => {
      socket.username = username;
      users[username] = socket.id;
      console.log(`Usuario ${username} conectado`);
      // Emitir evento para notificar a todos los usuarios conectados
      io.emit("user connected", username);
    }); */

    socket.on("join room", async (roomId, messageData, callback) => {
      if (socket.room) {
        console.log("en otra sala " + socket.room);
        return callback({
          status: 403,
          message: "Actualmente estas en otra sala de chat",
        });
      }

      //PARA FRONT: cuando se crea el chat no debe pasarse ningun room id o pasarse como undefined
      if (roomId === null) {
        const createdChat = await createChat(messageData);
        roomId = createdChat._id.toString();

        console.log(typeof roomId);
        if (createChat === false) {
          return callback({
            status: 500,
            message: "Hubo un error al crear el chat",
          });
        }
      } else {
        const joined = await joinToChat({
          chatId: roomId,
          idUserHelping: messageData.idUserHelping,
        });

        if (joined === 404) {
          return callback({
            status: 404,
            message: "No se ha encontrado el chat",
          });
        } else if (joined === false) {
          return callback({
            status: 500,
            message: "Hubo un error al entrar el chat",
          });
        }
      }

      console.log("room id " + roomId);
      try {
        socket.room = roomId;
        socket.join(roomId);
        const room = io.sockets.adapter.rooms.get(roomId);

        console.log(room);
        callback({
          status: 200,
        });
      } catch (error) {
        callback({
          status: 500,
          message: "No se ha podido iniciar el chat",
        });
      }
    });

    // Manejar el evento de envío de mensaje en una sala
    socket.on("room message", ({ roomId, message }) => {
      io.to(roomId).emit("room message", {
        sender: socket.username,
        message,
      });
    });
  });
};
