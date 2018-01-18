const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config')[process.env.NODE_ENV];

const generateToken = (req, res) => {
    jwt.sign(req.user, config.secret, {
        expiresIn: '2d',
        issuer: 'sds.act.coach',
        subject: 'JiksawAuth'
    }, (err, newToken) => {
        if(err) {
            console.log("====generateToken:Error" + err.message);
            res.sendStatus(403);
        } else {
            res.json(newToken);
        }
    });
};

const upsertUser = (req, res) => {
    const employeeNumber = (req.employeeNumber)? req.employeeNumber : req.body.employeeNumber;

    User.findOneAndUpdate({employeeNumber : employeeNumber},
        { $set: {
            name : req.body.name,
            nickName : req.body.nickName,
            email : req.body.email,
            gender: req.body.gender,
            cellPhoneNumber: req.body.cellPhoneNumber,
            team: req.body.team,
            department: req.body.department,
            rank: req.body.rank,
            duty: req.body.duty,
        } }, {upsert: true})
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('===upsertUser:Error' + err.message);
            res.sendStatus(500);
        });
};

const login = (req, res, next) => {
    User.findOne({employeeNumber: req.body.employeeNumber})
        .then(user => {
            if(!user) {
                res.sendStatus(404);
            } else if(user.cellPhoneNumber !== req.body.cellPhoneNumber) {
                res.sendStatus(403);
            } else {
                req.user = {};
                req.user.employeeNumber = user.employeeNumber;
                next();
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};


module.exports = {upsertUser, generateToken, login};