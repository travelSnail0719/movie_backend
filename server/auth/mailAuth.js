const nodeMailer = require('nodemailer');
const config = require('../key');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    insecureAuth : config.insecureAuth
});

const smtpTransport = nodeMailer.createTransport({
    service : 'Gmail',
    auth:{
        user : config.googleID,
        pass : config.googlePW
    },
    tls : {
        rejectUnauthorized : false
    }
});

let createRandom = (min, max) => {
    let randomNum = Math.floor(Math.random() * (max * min -1)) + min;
    return randomNum;
}

const mailSend = (req, res) => {
    const userMail = req.body.userMail;

    const mailOptions = {
        from : config.googleID,
        to : userMail,
        subject : '회원가입 인증을 위한 발송 메일입니다.',
        test : ''
    }

    db.query('SELECT USER_MAIL FROM T_USER WHERE USER_MAIL = ?', [userMail], (error, checkDuplicate) => {
        if(checkDuplicate.length <= 0){
            
        } else {
            res.json({message : '동일한 이메일이 존재합니다.'});
            return;
        }
    })
}