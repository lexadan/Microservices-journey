const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const User = new Schema({
    username: {
        type    : String,
        trim    : true,
        required: [true, 'Username is mandatory']
    },
    email: {
        type     : String,
        trim     : true,
        required : [true, 'Email is mandatory'],
        unique   : true, // index unique
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});

// hook executé avant la sauvegarde d'un document. Hash le mot de passe quand il est modifié
User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User', User);