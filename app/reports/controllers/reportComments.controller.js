const CommentsReportsModel = require("../models/commentsReports.model");
const CommentsModel = require("../../comments/models/comments.model");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.createCommentReport = async (req, res, next) => {
  const { idComment, reporterId } = req.body;
  const report = new CommentsReportsModel(req.body);

  try {
    if (!esIdMongo(reporterId)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }

    if (!esIdMongo(idComment)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }
    const commentInfo = await CommentsModel.findOne({ _id: idComment });

    console.log("rooom " + JSON.stringify(idComment));

    if (!commentInfo) {
      return res.status(404).json({
        message: "El comentario no existe",
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

exports.updateCommentReport = async (req, res, next) => {
  const { reportId } = req.body;

  let updateFields = req.body;
  if (!esIdMongo(reportId)) {
    return res.status(500).json({ message: "ID de comentario invalido" });
  }

  try {
    const updateObject = { $set: updateFields };

    const updatedReport = await CommentsReportsModel.findByIdAndUpdate(
      { _id: reportId },
      { ...updateObject, status: "reviewed" },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    res.status(200).json({ message: "El reporte ha sido actualizado" });
  } catch (error) {
    console.log("errror " + JSON.stringify(error));
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
