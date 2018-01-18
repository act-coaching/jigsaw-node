const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/router');
const Auth = require('./middleware/auth');
const db = require('./db');
const port = require('./config')[process.env.NODE_ENV].port;
const http = require('http');

db.init();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/', router);

http.createServer(app).listen(port, () => {
    console.log('Express App on http port ' + port);
});

module.exports = app;