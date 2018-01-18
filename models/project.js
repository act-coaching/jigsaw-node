const mongoose = require('mongoose');
const projectsSchema = new mongoose.Schema({
    projectCode : String,
    projectName: String,
});
const project = mongoose.model('projects', projectsSchema);
module.exports = project;