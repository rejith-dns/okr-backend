const mongoose = require("mongoose");

let ObjectiveSchema = new mongoose.Schema({
  // title:{
  //     type:String,
  // },
  // completed:{
  //     type:Boolean,
  //     default:false,
  // },
  // parent:{
  //     type:Boolean,
  //     default:false,
  // },
  // parentId:{
  //     type: String
  // }
  treeData: {
    type: Array,
  },
});

let userNodeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  nodeId: {
    type: String,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ObjectiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Objective",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  Objective: mongoose.model("Objective", ObjectiveSchema),
  UserNode: mongoose.model("UserNode", userNodeSchema),
};
