const router = require("express").Router();
const controller = require("./controller");
const authguard = require("../../../middleware/authGuard");

module.exports = {
    configure({ app }) {
        router.get('/',authguard,controller.getObjectiveTree);
        router.post('/',authguard,controller.createNewObjective);
        router.get('/:objectiveId',authguard,controller.getObjectiveById);
        router.put('/:objectiveId',authguard,controller.updateObjectiveById);
        router.delete('/:objectiveId',authguard,controller.deleteObjectiveById);
        return router;
    },
};
