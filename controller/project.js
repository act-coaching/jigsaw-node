const Project = require('../models/project');
const ProjectHistory = require('../models/projectHistory');

const getProjects = (req, res) => {
    Project.find({}, { _id:0, projectCode: 1, projectName: 1})
        .then(projects => res.json(projects))
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

module.exports = {getProjects};