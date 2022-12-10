const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const {searchMovies} = require('./movieApi/searchMovies');
const {register} = require('./auth/register');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World NodeJs'));

// 영화 검색 요청
app.get('/search/movies', searchMovies);

// 회원가입
app.post('/register', register);



app.listen(port, () => console.log(`let's start listening on port ${port}`));