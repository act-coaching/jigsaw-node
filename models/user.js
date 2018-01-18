const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
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
});
const user = mongoose.model('users', usersSchema);
module.exports = user;