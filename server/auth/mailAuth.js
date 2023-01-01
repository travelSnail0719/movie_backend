const mailAuth = (req, res) => {
    const authNum = req.body.authNum;

    if(authNum == req.session.authNum){
        req.session.authCheck = true;
    } else {
        req.session.authCheck = false;
    }
    req.session.save();
}
module.exports = {mailAuth};