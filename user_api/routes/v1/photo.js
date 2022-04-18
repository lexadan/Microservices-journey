const express = require('express');
const router = express.Router();

const service = require('../../services/v1/photo');

router.post('/add', service.addPhoto);

router.get('/all', service.getPhotos);

router.get('/:id', service.getOnePhoto);

router.get('/feed/:idx', service.getFeed);


module.exports = router;