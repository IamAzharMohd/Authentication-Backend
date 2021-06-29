const express = require ('express');
const router = express.Router();
const { users, posts } = require('../db');
const validator = require('validator');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//validator
const check_Error = () => {
    return [
        check('email', 'invalid email').isEmail(),
        check('password', 'min password length is 5').isLength({ min:5 })
    ]
}

//get user
router.get('/user', (req, res)=>{
    res.json(users);
})

//get post dummy routes
router.get('/posts', (req, res) => {
    res.json(posts);
});


//signup user
router.post('/signup', check_Error(), async (req, res) => {
    const { email, password } = req.body;
    const errors_check = validationResult(req);
    //validate user
    if(!errors_check.isEmpty) {
        return res.status(404).json(errors_check);
    }

    //check if user exist
    let user = users.find((user) => {
        return user.email === email
    });

    if (user) {
        return res.status(404).json( {
            "errors": [
                {
                    "msg":"email is already used"
                }
            ]
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    console.log(email, hashed_password);

    users.push({ email, hashed_password });

    const token = jwt.sign( {
        email
    }, 'this is a secret', {
        expiresIn: '3 days'
    });

    res.json(token);
});




//login user
router.post('/login', (req, res) => {
    res.send('this is login')
});



module.exports = router;