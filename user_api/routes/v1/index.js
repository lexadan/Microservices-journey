var express = require('express');
var router = express.Router();

const imageRoute = require('./photo');
const authRoute = require('./auth');

router.get('/', async (req, res) => {
    res.status(200).json({
        name   : 'API', 
        version: '1.0', 
        status : 200, 
        message: 'Bienvenue sur l\'API !'
    });
});

router.use('/auth', authRoute);
router.use('/image', imageRoute);

module.exports = router;