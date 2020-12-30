const mongoose = require('mongoose');

// criando as migrations
const UserList  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    participation: {
        type: Number,
        required: true
    }
})

mongoose.model('user', UserList)