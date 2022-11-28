const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const config = require('./key');

const db = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    insecureAuth : config.insecureAuth
});

app.get('/', (req, res) => res.send('Hello World NodeJs'));

app.listen(port, () => console.log(`let's start listening on port ${port}`));