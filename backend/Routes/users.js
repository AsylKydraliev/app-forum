const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });

        user.generateToken();
        await user.save();

        return res.send(user);

    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.post('/sessions',async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(400).send({error: 'Wrong data'});
        }
        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch){
            return res.status(400).send({error: 'Wrong data'});
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
    }
})

module.exports = router;