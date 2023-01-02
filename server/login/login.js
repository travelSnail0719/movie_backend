const mysql = require('mysql');
const config = require('../key');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    insecureAuth : config.insecureAuth
});

const login = (req, res) => {
    const userId = req.body.userId;
    const userPw = req.body.userPw;

    const sqlQuery = 'SELECT USER_ID, USER_PW FROM T_USER WHERE USER_ID = ?;';
    
    db.query(sqlQuery, [userId], (err, result) => {
        if(err){
            res.send(err);
        }

        if(!result[0]){
            return res.json({message : '아이디 또는 비밀번호를 확인해주세요111'});
        }
        console.log('result', result[0].USER_PW);
        console.log('pw', userPw);
        const check = bcrypt.compare(userPw, result[0].USER_PW, (error, res) => {
            if(error){
                res.send(error)
            } else {
                console.log('결과는?', res);
            }
        });
    });
};

module.exports = {login};