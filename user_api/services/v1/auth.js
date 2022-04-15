const User = require('../../models/user');
const bcrypt   = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({email: email});
        if (user) {
            let verified = bcrypt.compareSync(password, user.password);
            if (verified) {

                console.log(process.env.ACCESS_TOKEN_SECRET);
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });

                console.log(accessToken);
                return res.status(200).json({
                    "status": "success",
                    "token": accessToken,
                    "user": user
                });
            } else {
                return res.status(404).json('Passwords doesn\'t match');
            }
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        console.log(error);
        return res.status(501).json(error);
    }
}

exports.register = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.create({username: username, email: email, password: password});

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
}