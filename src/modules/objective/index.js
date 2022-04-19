const router = require("express").Router();
const controller = require("./controller");
const authguard = require("../../../middleware/authGuard");
const validator = require("./validator");

module.exports = {
  configure({ app }) {
    router.get("/", authguard, controller.getObjectiveTree);
    router.post("/", authguard, controller.createNewObjective);
    router.get("/:objectiveId", authguard, controller.getObjectiveById);
    router.put("/:objectiveId", authguard, controller.updateObjectiveById);
    router.delete("/:objectiveId", authguard, controller.deleteObjectiveById);
    router.post("/assign-node", authguard,validator.assignNode, controller.assignNode);
    router.get("/assign-node-users/:objectiveId/:nodeId", authguard, controller.getAssignNodeUsers);
    router.get('/get-assigned-nodes-by-user/:objectiveId/:userId', authguard, controller.getAssignedNodesByUser);
    return router;
  },
};
