const express = require('express');
const router = express.Router();
const User = require('../controller/user');
const Project = require('../controller/project');
const ProjectHistory = require('../controller/projectHistory');
const Auth = require('../middleware/auth');

//User
router.post('/login', User.login, User.generateToken);
router.get('/logout', Auth.tokenVerifier, (req, res) => res.sendStatus(200));
router.post('/users', User.upsertUser);
router.put('/users', Auth.tokenVerifier, User.upsertUser);

//Project
router.get('/projects', Auth.tokenVerifier, Project.getProjects);
router.get('/my/projects', Auth.tokenVerifier, ProjectHistory.getMyProjectHistories);
router.put('/my/projects/:projectCode', Auth.tokenVerifier, ProjectHistory.upsertMyProjectHistories);
router.delete('/my/projects/:projectCode', Auth.tokenVerifier, ProjectHistory.removeMyProjectHistories);

module.exports = router;