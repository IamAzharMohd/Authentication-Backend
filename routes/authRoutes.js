const express = require ('express');
const router = express.Router();
const { users, posts } = require('../db');
const validator = require('validator');
const { body, check, validationResult } = require('express-validator');

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

//signup user
router.post('/signup', check_Error(), (req, res) => {
    const { email, password } = req.body;
    const errors_check = validationResult(req);

    if(!errors_check.isEmpty) {
        return res.status(404).json(errors_check);
    }
    users.push({ email, password });
    res.send('user added');
});

//login user
router.post('/login', (req, res) => {
    res.send('this is login')
});

module.exports = router;