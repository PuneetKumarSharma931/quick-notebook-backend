const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: true,
        minlength: [3, 'Title Should atleast be 3 characters long!']
    },

    description: {
        type: String,
        required: true,
        minlength: [5, 'Description Should atleast be 5 characters long!']
    },

    tag: {
        type: String,
        default: "General"
    },

    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const note = new mongoose.model('note', NotesSchema);

module.exports = note;