const Photo = require ('../../models/photo');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const photo = require('../../models/photo');

exports.addPhoto = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const image = req.body;

    var requestOptions = {
        method: 'POST',
        headers: {"Content-Type" : "image/jpeg"},
        body: image,
        redirect: 'follow'
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(404).json('Invalid Token');
        }
        console.log(user);
        fetch("http://api-service:5000/store_img", requestOptions)
        .then(response => response.json())
        .then(async (result) => {
            if (result.status == "success") {
                
                try {
                    let newImage = await Photo.create({photoId: result.payload.id, userId: user._id});

                    return res.status(201).json(newImage);
                } catch (error) {
                    return res.status(501).json(error);
                }

            }
        })
        .catch(error => res.status(404).json(error));
    });
    
}

exports.getPhotos = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(404).json('Invalid Token');
        }

        let photos = await Photo.find({userId: user._id});
        let ids = [];
        for (let photo of photos) {
            ids.push(photo.photoId);
        }
        let id_string = ids.join(',');
        console.log(id_string);
        fetch(`http://api-service:5000/get_file?id=${id_string}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status == "success") {
                res.status(200).json(result.payload.files);
            } else {
                return res.status(404).json('Querry Failed');
            }
        })
        .catch(error => res.status(404).json(error));
        
    });
}

exports.getOnePhoto = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const imageId = req.params.id;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(404).json('Invalid Token');
        }

        try {
            Photo.find({userId: user._id, photoId: imageId});
        } catch (error) {
            return res.status(404).json(error);
        }
        fetch(`http://api-service:5000/get_file?id=${imageId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status == "success") {
                res.status(200).json(result.payload.files);
            } else {
                return res.status(404).json('Querry Failed');
            }
        })
        .catch(error => res.status(404).json(error));
        
    });
}

exports.getFeed = async (req, res, next) => {

    const idx = req.params.idx;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://api-service:5000/get_file?last=${idx}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.status == "success") {
            res.status(200).json(result.payload.files);
        } else {
            return res.status(404).json('Querry Failed');
        }
    })
    .catch(error => res.status(404).json(error));
}