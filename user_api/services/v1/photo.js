const Photo = require ('../../models/photo');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

exports.addPhoto = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const image = req.body.image;

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
        const imgs = [];

        let ids = await Photo.find({userId: user._id});
        for (let id of ids) {
            let response = await fetch(`http://api-service:5000/get_file?id=${id.photoId}`, requestOptions);
            let result = await response.json()
            if (result.status == "success") {
                imgs.push(result.payload.files);
                console.log(imgs);
            }
        }
        return res.status(200).json(imgs);
    });
}