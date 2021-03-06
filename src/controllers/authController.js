const express = require('express');

const User = require('../models/user');

const router = express.Router();

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {

    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const user = await User.create(req.body);
        return res.send({ user, token: generateToken({ id: user.id }) });
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        res.status(400).send({ error: 'User not found' });
    }

    if (user.password != password) {
        res.status(400).send({ error: 'Invalid password' });

    }

    user.password = undefined;



    res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = app => app.use('/auth', router);