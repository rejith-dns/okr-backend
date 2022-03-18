const mongoose = require('mongoose')

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
    treeData:{
        type:Array,
    }
})

module.exports = {
    Objective:mongoose.model('Objective',ObjectiveSchema)
}