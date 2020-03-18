const User = require('../models/User');
const express = require('express');//
const router = express.Router();//


router.get('/', (req, res, next) => {
    const { id } = req.query;
    const errors = {};
    if(id) {
        User.findById(id, (err, user) => {
            if(err) {
                errors.user = err;
                return res.status(400).json({errors});
            }
            else {
                return res.json(user);
            }
        })
    }
    else { User.find((err, user) => {
        if(err) {
            errors.user = err;
            return res.status(400).json({errors})
        }
        return res.json(user);
    })}
})

router.post('/', (req, res) => {
    const errors = {};
    const { _id } = req.body;
    User.findByIdAndUpdate(_id, req.body, { new: true }, (err, user) => {
        if(err) {
            errors.user = err;
            return res.status(400).json({errors});
        } else if (!user) {
            errors.user = 'User not found';
            return res.status(400).json({errors});
        }
        else if(!user.firstSetupDate) {
            User.findByIdAndUpdate(_id, {firstSetupDate: new Date()}, { new: true }, (err, updatedUser) =>{
                if(err) {
                    errors.user = err;
                    return res.status(400).json({errors});
                }
                else {
                    res.json(updatedUser);
                }
            })
        }
        else {
            res.json(user);
        }
    })
})

router.put('/', (req, res, next) => {//
    const errors = {};//
    const newUser = new User(req.body);//
    newUser.save((err, user) => {
        if(err) {
            errors.user = err;
            return res.status(400).json({errors});
        }
        return res.json(user);
    })//
}) //

/*function put(req, res) {
    const errors = {}
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if(err) {
            errors.user = err;
            return res.status(404).json({errors});
        }
        
        return res.json(user);
        
    })
}
function get(req, res) {
    const errors = {}
    User.find((err, user) => {
        if(err) {
            errors.user = err;
            return res.status(404).json({errors})
        }
        return res.json(user);
        
    })
}
*/

module.exports = router;//