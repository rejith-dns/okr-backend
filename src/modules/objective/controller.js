const Objective = require("./model").Objective;
const UserNode = require("./model").UserNode;
const objectiveServices = require("./service");
const mongoose = require("mongoose");

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

// const createNewTest = async (req, res) => {
//   try{
//     let newTest = req.body;
//     let test = new Test(newTest);
//     let treeData = test.save();
//     if(test){
//       return res.status(201).json({
//         test,
//         message: "New test created.",
//       });
//     }
//   }catch(error){
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// }

// const getTestTree = async (req, res) => {
//   try{
//     let ac = mongoose.Types.ObjectId('6253ed4579cc827c1cc35a4c');
//     let treeData = await Test.aggregate([
//       {
//         $match: {
//           "_id": ac
//         }
//       },
//       {
//         $graphLookup: {
//           from: "collection",
//           startWith: "$child",
//           connectFromField: "child",
//           connectToField: "_id",
//           as: "childrens",
//         },
//       },
//       {
//         $project: {
//           children: {
//             "$concatArrays": [
//               [
//                {title: "$title", _id: "$_id", child: "$child", parent: "$parent"},
//               ],
//               {
//                 $map: {
//                   input: "$childrens",
//                   as: "group",
//                   in: "$$group.title"
//                 }
//               }
//             ]
//           }
//         }
//       }
//     ])
//     console.log(treeData)
//     return res.status(200).json({
//       success: true,
//       treeData
//     })
//   }catch(error){
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// }

const assignNode = async (req, res) => {
  try {
    let nodeId = req.body.nodeId;
    let ObjectiveId = req.body.ObjectiveId;
    nodeExist = await UserNode.findOne({ nodeId, ObjectiveId });

    if (nodeExist) {
      let update = await UserNode.updateOne(
        { nodeId, ObjectiveId },
        { $set: { users: req.body.users, updatedBy: req.user._id } }
      );
      if (update) {
        return res.status(200).json({
          success: true,
          second: true,
          message: "Node assigned successfully",
        });
      }
    } else {
      let assignNodeObj = {
        ...req.body,
        createdBy: req.user._id,
        updatedBy: req.user._id,
      };
      let assignNode = new UserNode(assignNodeObj);
      let assign = await objectiveServices.createAssignNode(assignNode);
      return res.status(200).json({
        success: true,
        message: "Node assigned successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAssignNodeUsers = async (req, res) => {
  try {
    let nodeId = req.params.nodeId;
    let ObjectiveId = req.params.objectiveId;
    let nodeExist = await UserNode.findOne({ nodeId, ObjectiveId });
    if (nodeExist) {
      let users = await UserNode.findOne({ nodeId, ObjectiveId }).populate(
        "users",
        "-password"
      );
      return res.status(200).json({
        success: true,
        nodeDetails:users,
      });
    } else {
      return res.status(200).json({
        success: true,
        nodeDetails: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAssignedNodesByUser = async (req, res) => {
  try{
    let userId = req.params.userId;
    let objectiveId = req.params.objectiveId;
    let assignedNodes = await UserNode.find({ ObjectiveId: objectiveId,users:{$in:[userId]}});
    if(assignNode.length>0){
      let assignedNodesDatas = assignedNodes.map((node)=>node.nodeId)
      return res.status(200).json({
        success: true,
        assignedNodes:assignedNodesDatas
      })
    }else{
      return res.status(200).json({
        success: true,
        assignedNodes:[]
      })
    }
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

module.exports = {
  getObjectiveTree,
  createNewObjective,
  getObjectiveById,
  updateObjectiveById,
  deleteObjectiveById,
  assignNode,
  getAssignNodeUsers,
  getAssignedNodesByUser
};
