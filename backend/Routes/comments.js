const express = require('express');
const mongoose = require("mongoose");
const multer = require("multer");
const {nanoid} = require("nanoid");
const path = require("path");
const Comment = require("../models/Comment");
const config = require("../config");

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

router.post('/', upload.single('image'), async (req, res, next) => {
    try{
        const comment = new Comment({
            text: req.body.text,
            user: req.body.user,
            post: req.body.post,
        });

        await comment.save();

        return res.send(comment);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try{
        let query = {};
        if(req.query.post){
            query.post = {_id: req.query.post};
        }

        const comments = await Comment.find(query);

        return res.send(comments);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

module.exports = router;