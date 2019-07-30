#!/usr/bin/env nodejs

const express = require('express');
const bodyParser = require('body-parser');
let https = require('https');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
    next();
  });

require('./app/controllers/index')(app);

// app.get('/', (req, res) => {
    
// });

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/tatiane.ntr.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tatiane.ntr.br/fullchain.pem')
}, app)
.listen(3000);
