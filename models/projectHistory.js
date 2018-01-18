const mongoose = require('mongoose');
const projectHistoriesSchema = new mongoose.Schema({
    employeeNumber: String,
    name : String,
    nickName : String,
    email : String,
    gender: String,
    cellPhoneNumber: String,
    team: String,
    department: String,
    rank: String,
    duty: String,
    projectCode : String,
    projectName: String,
    assignType: String,
});
module.exports = mongoose.model('project-histories', projectHistoriesSchema);