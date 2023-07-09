const express = require('express');
const mongoose = require('mongoose');
const note = require('../models/Notes');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();

//Route 1: Get all notes of a particular user | It requires user to login first

router.get('/getallnotes', fetchUser, async (req, res)=>{

    try {
        
        const Notes = await note.find({user: req.user.id});
        res.status(200).json(Notes);

    } catch (err) {
        
        res.status(501).json({err: "Internal Server Error!"});
    }
});

//Route 2: Create a new note | It requires user to login first

router.post('/createnote', fetchUser, async (req, res)=>{

    try {
        
        const { title, description, tag } = req.body;

        const Note = new note({user: req.user.id, title, description, tag});
        const savedNote = await Note.save();
        res.status(200).json(savedNote);

    } catch (err) {
        
        res.status(400).json(err.message);
    }
});

//Route 3: Update an Existing note | It requires user to login first

router.put('/updatenote/:id', fetchUser, async (req, res)=>{
        
    try {
        const { title, description, tag } = req.body;

        const newNote = {};

        if(title)
            newNote.title = title;
        if(description)
            newNote.description = description;
        if(tag)
            newNote.tag = tag;

        let Note = await note.findById(req.params.id);

        if(!Note)
            return res.status(404).json({err: "Note Does Not Exist!"});

        if(Note.user.toString() != req.user.id)
            return res.status(401).json({err: "Access Denied!"});

        Note = await note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

        res.status(200).json(Note);
    }
    catch(err) {

        res.status(501).json({err: "Internal Server Error!"});
    }
    
});

//Route 4: Delete an existing note | It requires user to login first

router.delete('/deletenote/:id', fetchUser, async (req, res)=>{
        
    try {

        let Note = await note.findById(req.params.id);

        if(!Note)
            return res.status(404).json({err: "Note Does Not Exist!"});

        if(Note.user.toString() != req.user.id)
            return res.status(401).json({err: "Access Denied!"});

        Note = await note.findByIdAndDelete(req.params.id);

        res.status(200).json({msg: "Note Successfully Deleted", note: Note});
    }
    catch(err) {

        res.status(501).json({err: "Internal Server Error!"});
    }
});


module.exports = router;