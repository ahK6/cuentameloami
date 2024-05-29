const PostReportsModel = require("../models/postsReports.model");
const PostModel = require("../../posts/models/posts.model");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.createPostReport = async (req, res, next) => {
  const { idPost, reporterId } = req.body;
  const report = new PostReportsModel(req.body);

  try {
    if (!esIdMongo(reporterId)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }

    if (!esIdMongo(idPost)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }
    const postInfo = await PostModel.findOne({ _id: idPost });

    if (!postInfo) {
      return res.status(404).json({
        message: "El post no existe",
      });
    }

    await report.save();
    res.status(200).json({ message: "Tu reporte ha sido enviado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};

exports.updatePostReport = async (req, res, next) => {
  const { reportId } = req.body;

  let updateFields = req.body;
  if (!esIdMongo(reportId)) {
    return res.status(500).json({ message: "ID de reporte invalido" });
  }

  try {
    const updateObject = { $set: updateFields };

    const updatedReport = await PostReportsModel.findByIdAndUpdate(
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
