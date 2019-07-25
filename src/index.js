#!/usr/bin/env nodejs

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

require('./app/controllers/index')(app);

// app.get('/', (req, res) => {
    
// });


app.listen(3000, 'localhost');
