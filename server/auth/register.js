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
    
    // 인증번호 일치 확인
    if(req.session.authCheck){
        // 모든 정보 다 들어왔는지 채크
        if(userId != null && userNm != null && userPw != null && userGen != null && userBir != null && userMail != null){
            // 아이디 중복체크
            db.query('SELECT USER_ID FROM T_USER WHERE USER_ID = ?', [userId], (error, checkDuplicate) => {
                // 아이디 중복이 없을 때
                if(checkDuplicate.length == 0){
                    const sqlQuery = 'INSERT INTO T_USER(USER_ID, USER_NM, USER_PW, USER_GEN, USER_BIR, USER_MAIL) VALUES (?, ?, ?, ?, ?, ?);';
                    db.query(sqlQuery, [userId, userNm, userPw, userGen, userBir, userMail], (err, result) => {
                        if(err){
                            return res.send(err);
                        } else {
                            res.status(200).json({message : '회원가입 성공!'})
                        }
                    }) 
                } else {
                    return res.json({message : '동일한 아이디가 존재합니다.'});
                }
            })
        } else {
            return res.json({message : '입력하지 않은 항목이 있습니다.'});
        }
    } else {
        return res.json({message : '인증번호 일치여부를 확인해주세요'});
    }
}
module.exports = {register};