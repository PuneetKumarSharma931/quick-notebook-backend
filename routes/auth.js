const express = require('express');
const mongoose = require('mongoose');
const user = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();
const JWT_Secret_Key = "PuneetKumarSharma";

//Route 1: Creating a New user it does not require user to login

router.post('/createuser', async (req, res)=>{

    try {

        const userData = new user(req.body);
    
        const savedUser = await userData.save();

        jwt.sign({
            user: {
                id: savedUser.id
            }
        }, JWT_Secret_Key, function(err, authToken){

            res.status(200).json({success: true, authToken});
        });

    }catch(err) {

        res.status(400).json({success: false, msg: err.message});
    }
    
});

//Route 2: Logging in user it does not require user to login

router.post('/login', async (req, res)=>{

    try {

        const { email, password } = req.body;

        const userData = await user.findOne({email});

        const comparePassword = await bcrypt.compare(password, userData.password);

        if(comparePassword) {

            jwt.sign({
                user: {
                    id: userData.id
                }
            }, JWT_Secret_Key, function(err, authToken) {

                res.status(200).json({success: true, authToken});
            });
        } 
        else {
            res.status(400).json({success: false, msg: "Invalid Email or Password!"});
        }
    }
    catch(err) {

        res.status(400).json({success: false, msg: "Invalid Email or Password!"});
    }
});

//Route 3: Get user from the auth token it requires user to login first

router.post('/getuser', fetchUser, async(req, res)=>{

    try {
        
        const userId = req.user.id;
        const userData = await user.findById(userId).select("-password");

        res.status(200).json({success: true, userData});

    } catch (error) {
        
        res.status(500).json({success: false, msg: "Internal Server Error!"});
    }
});


module.exports = router;