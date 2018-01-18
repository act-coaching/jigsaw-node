const jwt = require('jsonwebtoken');
const config = require('../config')[process.env.NODE_ENV];

const tokenVerifier = (req, res, next) => {
    const check = (token) => {
        if (!token) {
            return new Promise((resolve, reject) => {
                const err = new Error("Has no token");
                err.errCode = 404;
                reject(err);
            });
        } else {
            return new Promise(
                (resolve, reject) => {
                    jwt.verify(token, config.secret, (err, decoded) => {
                        if(!err) {
                            resolve(decoded);
                        } else if(err instanceof jwt.TokenExpiredError) {
                            err.errCode = 401;
                            reject(err);
                        } else {
                            err.errCode = 403;
                            reject(err);
                        }
                    })
                }
            );
        }
    };

    const onError = (err) => {
        console.log('===tokenVerifier:onError');
        res.sendStatus(err.errCode);
    };
    const onSuccess = (decoded) => {
        req.employeeNumber = decoded.employeeNumber;
        next();
    };

    check(req.headers['x-access-token'])
        .then(onSuccess)
        .catch(onError);
};

module.exports = {tokenVerifier};
