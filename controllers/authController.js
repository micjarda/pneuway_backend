//const mongoose = require('mongoose')
require('dotenv').config();
const jwt = require('jsonwebtoken');

const POSTS = [
    {
        'username': 'jarda',
        'title': '1'
    },
    {
        'username': 'chrostik',
        'title': '2'
    }
];

const test = (req, res) => {
    console.log(req.username);
    res.json(POSTS.filter(post => post.username === req.username));
}

const login = (req, res) => {
    console.log(req.body.username, req.body.password);
    const username = req.body.username;
    const user = { name: username };
    const password = req.body.password;
    if(username === 'jarda' && password === 'Mogus') {
        const acssestoken = jwt.sign(user, process.env.ACSSES_TOKEN_SECRET, { expiresIn: '45s' });
        res.status(200).json({
            token: acssestoken
        });
    }
    else {
        res.status(401).json({
        message: 'Login Failed'
        });
    }
}

const authenticateToken = (req, res) => {
    console.log(req.body.authorization);
    const authHeader = req.headers['authorization'];
    const token = req.body.authorization;
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACSSES_TOKEN_SECRET, (err, user) => {
        if(err) console.log('NOT OK');
        else
        console.log('+ OK ' + user.name);
        req.user = user;
        res.json(POSTS.filter(post => post.username === user.name));
    });
}

module.exports = {
    test,
    login,
    authenticateToken
}