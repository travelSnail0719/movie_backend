const mailAuth = (req, res) => {
    const authNum = req.body.authNum;

    if(authNum == req.session.authNum){
        req.session.authCheck = true;
        res.json({code : 200});
    } else {
        req.session.authCheck = false;
        res.json({code : 400});
    }
    req.session.save();
}
module.exports = {mailAuth};