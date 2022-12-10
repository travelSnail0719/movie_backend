const config = require('../key');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    insecureAuth : config.insecureAuth
});


const register = (req, res) => {
    const userId = req.body.userId;
    const userNm = req.body.userNm;
    const userPw = bcrypt.hashSync(req.body.userPw, 10);
    const userGen = req.body.userGen;
    const userBir = req.body.userBir;
    const userMail = req.body.userMail;
    
    const sqlQuery = 'INSERT INTO T_USER(USER_ID, USER_NM, USER_PW, USER_GEN, USER_BIR, USER_MAIL) VALUES (?, ?, ?, ?, ?, ?);';
    db.query(sqlQuery, [userId, userNm, userPw, userGen, userBir, userMail], (err, result) => {
        if(err){
            res.send(err);
            console.log('err', err);
        } else {
            res.send(result);
            console.log('result', result);
        }
    }) 
}

module.exports = {register};