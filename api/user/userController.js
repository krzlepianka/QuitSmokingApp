const User = require('../user/userModel');

exports.createUser = (req, res) =>{
    const errors = {};//
    const newUser = new User(req.body);//
    newUser.save((err, user) => {
        if(err) {
            errors.user = err;
            return res.status(400).json({errors});
        }
        return res.json(user);
    })
}

exports.getUser = (req, res) => {
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
    else { 
        User.find((err, user) => {
        if(err) {
            errors.user = err;
            return res.status(400).json({errors})
        }
        return res.json(user);
    })}
}

exports.updateUser = (req, res) => {
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
}

/*router.get('/', (req, res, next) => {
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
    else { 
        User.find((err, user) => {
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

/*
1. zamienic funkcje anonimowe na imienne, 
2. zakonczyc w stylu:
router.put('/', put);
module.exports = router;


module.exports = router;
*/