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
    service : 'Naver',
    auth:{
        user : config.naverID,
        pass : config.naverPW
    },
    tls : {
        rejectUnauthorized : false
    }
});

let createRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min));
}

const randomCode = createRandom(000000, 999999);

const mailSend = async (req, res) => {
    // 동일한 메일로 여러 아이디 회원가입 가능
    const userMail = req.body.userMail;
    // db.query('SELECT USER_MAIL FROM T_USER WHERE USER_MAIL = ?', [userMail], (error, checkDuplicate) => {
        // if(checkDuplicate.length <= 0){
            const mailOptions = {
                from : config.naverID,
                to : userMail,
                subject : '회원가입 인증을 위한 발송 메일입니다.',
                text : `인증번호는 ${randomCode} 입니다.`,
                html : `<div style='font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 540px; height: 600px; border-top: 4px solid #348fe2; margin: 100px auto; padding: 30px 0; box-sizing: border-box;'>
                    <h1 style='margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;'>
                    <span style='font-size: 15px; margin: 0 0 10px 3px;'>SearchMovie</span><br />
                    <span style='color: #348fe2;'>인증번호</span> 안내입니다.
                    </h1>
                    <p style='font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;'>
                    안녕하세요.<br />
                    요청하신 인증번호가 생성되었습니다.<br /> 감사합니다.</p>
                    <p style='font-size: 16px; margin: 40px 5px 20px; line-height: 28px;'>
                    인증번호: <br />
                    <span style='font-size: 24px;'> ${randomCode} </span>
                    </p>
                    <div style='border-top: 1px solid #DDD; padding: 5px;'>
                    </div>
                    </div>`
            };

            smtpTransport.sendMail(mailOptions, (err, result) => {
                if(err){
                    return res.send(err);
                } else {
                    console.log('success!!!!');
                    req.session.authNum = randomCode;
                    req.session.save(() => {
                        res.send(result);
                    })
                    console.log('/result', req.session);
                }
                smtpTransport.close();
            });
        // } else {
        //     console.log(error);
        //     res.json({message : '동일한 이메일이 존재합니다.'});
        //     return;
        // }
    // })
}
module.exports = {mailSend};