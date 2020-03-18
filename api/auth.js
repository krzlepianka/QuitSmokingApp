const User = require('../models/User');
const express = require('express');
const router = express.Router();
const crypto= require('crypto'); 
const jwt = require('jsonwebtoken');


router.post('/login', (req, res) => {
    const errors = {};
    const {login, password} = req.body;
    let hash;
    try {
        hash = crypto.createHash('md5').update(password).digest("hex");
    } catch(error) {
        errors.hash=error;
        res.status(500).json({
            errors
        })
    }
    console.log('login = ', login, ', hash = ', hash, login.length)
    User.find({login}, (err, users) => {
        console.log('users = ', users);
        const user = users[0];
        if(!user) {
            errors.user = "Couldn't find user";
            res.status(404).json(errors);
        } else if(err) {
            errors.user = err;
            res.status(500).json(errors);
        }
        else {
            if (user && user.hash === hash) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (Number(process.env.AUTH_EXP)),
                    data: {
                        login,
                        _id: user._id
                    }
                }, process.env.AUTH_SECRET)
                res.status(200).send({token});
            } else {
                errors.user = "Wrong credentials";
                res.status(500).json(errors);
            }            
        }
    })
});

router.post('/register', (req, res) => {
    const errors = {};
    const {password, login, email } = req.body;
    let hash;
    try {
        hash = crypto.createHash('md5').update(password).digest("hex");
    } catch(error) {
        errors.hash=error;
        res.status(500).json({
            errors
        })
    }
    const newUser = new User({login, hash, email});
    newUser.save((err, user) => {
        if(err) {
            errors.user = err;
            res.status(500).send({
                errors
            })
        }
        else {
            res.json(user) // { login, password } // { user: { login, password }}
        }
    })
});


router.post('/', (req, res) => {
    const { authorization } = req.headers; 
    const token = authorization.slice(7);
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if(err) {
            res.status(500).json(err);
        }
        else {
            res.json(decoded);
        }
    });
});

module.exports = router;

