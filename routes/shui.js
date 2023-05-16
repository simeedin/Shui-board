const { Router } = require('express');
const router = new Router();

const { createUser } = require('../models/user');


router.get('/board', (req, res) => {

});

router.post('/channel', (req, res) => {

});

router.post('/signup', (req, res) => {
    const {username, password} = req.body;

    createUser(username, password);

    res.json({ message: `User signed up: ${username}, ${password}` });
    
})


module.exports = router