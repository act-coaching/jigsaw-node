const User = require('../models/user');
const ProjectHistory = require('../models/projectHistory');

const getProjectHistories = (req, res) => {
    ProjectHistory.find({})
        .then(projectHistories => res.json(projectHistories))
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

const getMyProjectHistories = (req, res) => {
    ProjectHistory.find({employeeNumber : req.employeeNumber})
        .then(projectHistories => res.json(projectHistories))
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

const upsertMyProjectHistories = (req, res) => {
    User.findOne({employeeNumber : req.employeeNumber})
        .then(user => ProjectHistory.findOneAndUpdate({employeeNumber : req.employeeNumber, projectCode: req.params.projectCode},
            { $set: {
                name : user.name,
                nickName : user.nickName,
                email : user.email,
                gender: user.gender,
                cellPhoneNumber: user.cellPhoneNumber,
                team: user.team,
                department: user.department,
                rank: user.rank,
                duty: user.duty,
                projectName: req.body.projectName,
                assignType: req.body.assignType
            } }, {upsert: true}))
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('===upsertProjectHistories:Error' + err.message);
            res.sendStatus(500);
        });
};

const removeMyProjectHistories = (req, res) => {
    ProjectHistory.remove({employeeNumber : req.employeeNumber, projectCode: req.params.projectCode})
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('===upsertProjectHistories:Error' + err.message);
            res.sendStatus(500);
        });
};

module.exports = {getProjectHistories, getMyProjectHistories, upsertMyProjectHistories, removeMyProjectHistories};