const express = require('express');
const mongoose = require("mongoose");
const multer = require("multer");
const {nanoid} = require("nanoid");
const path = require("path");
const Post = require("../models/Post");
const config = require("../config");
const authorization = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', authorization, upload.single('image'), async (req, res, next) => {
    try{
        const post = new Post({
            title: req.body.title,
            user: req.body.user,
            description: null,
            date: new Date().toISOString(),
            image: null
        });

        if(req.file){
            post.image = req.file.filename;
        }

        if(req.body.description){
            post.description = req.body.description;
        }

        await post.save();

        return res.send(post);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try{
        const sort = {};
        sort._id = -1;

        const posts = await Post.find().sort(sort).populate('user', 'name');

        return res.send(posts);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const product = await Post.findOne({_id: req.params.id}).populate('user', 'name');

        return res.send(product);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

module.exports = router;