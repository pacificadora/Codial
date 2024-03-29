const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email})

        if(!user || user.password!=req.body.password){
            return res.json(422, {
                message: 'invalid user name and password',
            })
        }

        return res.json(200, {
            message: 'signin is successful, here is your token, please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(), 'codial', {expiresIn: '100000'}) //using the same key used in passport-jwt-strategy
            }
        })


    }catch(err){
        console.log('*******', err);
        return res.json(500, {
            message: 'internal server error',
        })
    }
}