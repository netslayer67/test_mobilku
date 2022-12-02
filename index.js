const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://admin:admin@cluster0.nlz0omn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('mongoDB Connected');
    }).catch((e) => {
        console.log(e);
    })

const router = require('./app/routes')

const app = express()

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(fileUpload())
    .use('/api', router)
// app.get('/', (req, res) => {
//     res.send('hello world')
// })

const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});