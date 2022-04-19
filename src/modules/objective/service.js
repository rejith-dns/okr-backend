const Objective = require("./model").Objective;

const getObjectiveTree = async () => {
  let objective = await Objective.find({});
  if (objective) {
    return objective;
  } else {
    return false;
  }
};

const getObjectiveById = async (objectiveId) => {
  let objective = await Objective.find({ _id: objectiveId });
  if (objective) {
    return objective;
  } else {
    return false;
  }
};

const deleteObjectiveById = async (objectiveId) => {
  let objective = await Objective.findByIdAndDelete({ _id: objectiveId });
  if (objective) {
    return objective;
  } else {
    return false;
  }
};

const updateObjectiveById = async (objectiveId, treeDat) => {
  let treeData = treeDat[0]
  let updateObjective = await Objective.updateOne(
    { _id: objectiveId },
    { $set: {treeData} },
   { new:true}
  );
  if (updateObjective) {
    return updateObjective;
  } else {
    return false;
  }
};

async function createAssignNode (data){
  try {
    let assignNode = await data.save();
    if (assignNode) {
      return assignNode;
    } else {
      return false;
    }
  } catch (error) {}
}

module.exports = {
  getObjectiveTree,
  getObjectiveById,
  deleteObjectiveById,
  updateObjectiveById,
  createAssignNode,
};
