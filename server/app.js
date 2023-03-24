const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require("./models/user.js");
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected Successfully'))
    .catch(() => console.log('Connected Unsuccessfully'));

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/sample/:id', (req, res) => {
    var id = req.params.id;
    res.send(id)
});

app.post('/account/signup', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
});

app.listen(3001);