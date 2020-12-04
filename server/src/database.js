const mongoose = require('mongoose')

mongoose
    .connect("mongodb://localhost/cidenet-test",{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err))
