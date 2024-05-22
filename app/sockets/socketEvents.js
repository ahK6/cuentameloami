const {
  createRoom,
  joinToRoom,
  getRoomById,
} = require("../messages/controllers/messages.controller");

module.exports = function (io, users) {
  io.on("connection", (socket) => {
    let users = {};

    const idUser = socket.handshake.query.idUser;

    console.log(`Nueva conexión. Parámetro extra: ${idUser}`);

    socket.userId = idUser;
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

      console.log("xdddd " + roomId);

      //PARA FRONT: cuando se crea el chat no debe pasarse ningun room id o pasarse como undefined
      if (roomId === null) {
        const createdChat = await createRoom(messageData);
        roomId = createdChat._id.toString();

        console.log(typeof roomId);
        if (createdChat === false) {
          return callback({
            status: 500,
            message: "Hubo un error al crear el chat",
          });
        }
      } else {
        const joined = await joinToRoom({
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
    socket.on("room message", ({ roomId, message }, callback) => {
      const room = io.sockets.adapter.rooms.get(roomId);
      let isInRoom;

      if (room) {
        const usersInRoom = Array.from(room);
        console.log("Usuarios en la sala:", JSON.stringify(usersInRoom));
        isInRoom = usersInRoom.includes(socket.id);
      } else {
        return callback({
          status: 500,
          message: "No perteneces a ninguna sala",
        });
      }

      if (!isInRoom) {
        return callback({
          status: 500,
          message: "No perteneces a esta sala",
        });
      }

      io.to(roomId).emit("room message", {
        sender: socket.username,
        message,
      });

      // Llama a la función de callback para confirmar que el mensaje se envió correctamente
      callback({
        status: 200,
        roomId: roomId,
      });
    });

    socket.on("leave-room", async (callback) => {
      const roomId = socket.room;

      if (roomId === undefined) {
        return callback({
          status: 400,
          message: "No estas unido a ninguna sala de chat",
        });
      }

      const creator = await getRoomById(roomId.toString());

      if (creator === 404) {
        return callback({
          status: 404,
          message: "No se ha encontrado la sala de chat",
        });
      } else if (creator === false) {
        return callback({
          status: 404,
          message: "Hubo un error al dejar el chat",
        });
      }

      const room = io.sockets.adapter.rooms.get(roomId);

      const socketUsuario = io.sockets.sockets.get(socket.id);

      console.log("creator " + creator.idUserCreator);

      console.log("userr consult " + socketUsuario.userId);

      if (creator.idUserCreator.toString() === socketUsuario.userId) {
        console.log("entrooooo 11111");
        for (const socketId of room) {
          // Obtener el socket correspondiente al ID
          const socketIns = io.sockets.sockets.get(socketId);

          // Verificar si el socket existe
          if (socketIns) {
            // Hacer que el socket salga de la sala
            socketIns.leave(roomId);
            // Eliminar cualquier referencia a la sala en el socket
            delete socketIns.room;
          }
        }
      } else {
        console.log("entrooooo 22222222");

        socket.leave(roomId);
        delete socket.room;
      }

      const room2 = io.sockets.adapter.rooms.get(roomId);
      let usersId2;

      if (room2) {
        usersId2 = Array.from(room2);
      } else {
      }

      console.log("dosooosdosssos " + JSON.stringify(usersId2));

      //return console.log(creator);
    });
  });
};
