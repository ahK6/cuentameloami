const ReportsModel = require("../models/reports.model");
const RoomsModel = require("../../rooms/models/rooms.model");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.createReport = async (req, res, next) => {
  const { idRoom, reporterId } = req.body;
  const report = new ReportsModel(req.body);

  try {
    if (!esIdMongo(reporterId)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }

    if (!esIdMongo(idRoom)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }
    const roomInfo = await RoomsModel.findOne({ _id: idRoom });

    console.log("rooom " + JSON.stringify(roomInfo));

    if (!roomInfo) {
      return res.status(404).json({
        message: "La sala no existe",
      });
    }

    await report.save();
    res.status(200).json({ message: "Tu reporte ha sido enviado" });
  } catch (error) {
    console.log("fwefef " + JSON.stringify(error));
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { roomId } = req.body;

  let updateFields = req.body;
  if (!esIdMongo(roomId)) {
    return res.status(500).json({ message: "ID de sala invalido" });
  }

  try {
    const updateObject = { $set: updateFields };

    const updatedReport = await ReportsModel.findByIdAndUpdate(
      { _id: roomId },
      updateObject,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(updatedReport);
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
