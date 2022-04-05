const User = require('../../models/user');
const bcrypt   = require('bcryptjs');

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({email: email});
        if (user) {
            let verified = bcrypt.compareSync(password, user.password);
            if (verified) {
                return res.status(200).json('Succesfull login');
            } else {
                return res.status(404).json('Passwords doesn\'t match');
            }
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
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