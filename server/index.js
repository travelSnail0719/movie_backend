const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
const config = require('./key');

const db = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    insecureAuth : config.insecureAuth
});

app.get('/', (req, res) => res.send('Hello World NodeJs'));

// 영화 검색 요청
app.get('/search/movies', (req, res) => {
    const clientId = config.clientId;
    const clientSecret = config.clientSecret;
    let apiUrl = `https://openapi.naver.com/v1/search/movie?query=${encodeURI(req.query.query)}`; 
    let params = req.query;
    for(const [key, value] of Object.entries(params)){
        if(key != 'query'){
            apiUrl += `&${key}=${value}`
        }
    }
    console.log('apiUrl', apiUrl);
    console.log('query', req.query);
    const request = require('request');
    const options = {
        url: apiUrl,
        headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret}
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});



app.listen(port, () => console.log(`let's start listening on port ${port}`));