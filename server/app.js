const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require("./models/user.js");
require('dotenv/config');

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected Successfully'))
    .catch(() => console.log('Connected Unsuccessfully'));

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/sample/:id', (req, res) => {
    var id = req.params.id;
    res.send(id);
});

app.get('/getUser', (req,res) => {
    console.log(req);
});

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
    console.log(user);
});

app.listen(3001);