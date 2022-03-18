const Objective = require("./model").Objective;
const objectiveServices = require("./service");

const getObjectiveTree = async (req, res) => {
  try {
    const treeData = await objectiveServices.getObjectiveTree();
    if (treeData) {
      return res.status(200).json({
        success: true,
        treeData,
      });
    } else {
      return res.status(200).json({
        success: true,
        treeData: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const createNewObjective = async (req, res) => {
  try {
    const newObjective = req.body;
    const objective = new Objective(newObjective);
    let treeData = objective.save();
    if (objective) {
      return res.status(201).json({
        objective,
        message: "New objective created.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getObjectiveById = async (req, res) => {
  try {
    let objectiveId = req.params.objectiveId;
    const treeData = await objectiveServices.getObjectiveById(objectiveId);
    if (treeData) {
      return res.status(200).json({
        success: true,
        treeData,
      });
    } else {
      return res.status(200).json({
        success: true,
        treeData: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateObjectiveById = async (req, res) => {
  try {
    let objectiveId = req.params.objectiveId;
    let treeData = req.body;
    let udpateObjective = objectiveServices.updateObjectiveById(
      objectiveId,
      treeData
    );
    if (udpateObjective) {
      return res.status(200).json({
        success: true,
        message: "Objective updated successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "failed to update objective",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteObjectiveById = async (req, res) => {
  try {
    let objectiveId = req.params.objectiveId;
    deleteObjective = await objectiveServices.deleteObjectiveById(objectiveId);
    if (deleteObjective) {
      return res.status(200).json({
        success: true,
        message: "Objective deleted successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "failed to delete objective",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getObjectiveTree,
  createNewObjective,
  getObjectiveById,
  updateObjectiveById,
  deleteObjectiveById,
};
