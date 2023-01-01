const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const {searchMovies} = require('./movieApi/searchMovies');
const {register} = require('./auth/register');
const {mailSend} = require('./auth/mailSend');
const {mailAuth} = require('./auth/mailAuth');
const cors = require('cors');
const session = require('express-session');
const memorySession = require('memorystore')(session);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
const maxAge = 1000 * 60 * 5;
app.use(session({
    secret : 'secret key',
    resave : false,
    saveUninitialized : true,
    store : new memorySession({checkPeriod : maxAge}),
    cookie:{
        maxAge
    }
}));

app.get('/', (req, res) => res.send('Hello World NodeJs'));

// 영화 검색 요청
app.get('/search/movies', searchMovies);

// 회원가입
app.post('/register', register);

// 회원가입 인증메일 발송
app.post('/mailSend', mailSend);

// 인증번호 일치여부 확인
app.post('/mailAuth', mailAuth);

app.listen(port, () => console.log(`let's start listening on port ${port}`));