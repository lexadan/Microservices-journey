const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Photo = new Schema({
    photoId: {
        type: String,
        required: [true, 'PhotoId is mandatory']
    },
    userId: {
        type: String,
        required: [true, 'UserId is mandatory']
    }
});

module.exports = mongoose.model('Photo', Photo);

