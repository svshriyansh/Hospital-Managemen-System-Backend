const { Router } = require('express');
require('dotenv').config()
const blacklisttoken = require('../models/token')
const authenticationToken = require('../middleware/auth')
const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const user  = require('../models/user');

// * for accessing by admin only

routes.get('/users', authenticationToken, async(req,res)=>{
    let user = await User.findOne({username: req.user.username})
    if (user.username == 'Shriyansh'){
    try{
        const user = await User.find()
        res.json(user)
    }catch(err){
        res.send("Error",err)
    }
}else{
    res.send("You can't access the db")
}
})

// routes.get('/users', authenticationToken, async(req,res)=>{
//     // let user = await User.findOne({username: req.user.username})
//     try{
//         const user = await User.find()
//         res.json(user)
//     }catch(err){
//         res.send("Error",err)
//     }
// })

routes.get('/user', authenticationToken ,async(req,res)=>{
    let user = await User.findOne({username: req.user.name})
    res.send(user)
})

routes.post('/signUP', async(req,res)=>{
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    try {
        let user = await User.findOne({username: username})
        if(user){
            res.send("User already exist")
        }
        user = await User.findOne({email: email}) 
        if(user){
            res.send("email already exist") 
        }
        user = new User({
            username : username,
            email : email,
            password : password
        })
        user = await user.save()
        res.json(user)
        
    } catch (error) {
        console.log(error);
        res.send("Some error occured")
    }
})

routes.post('/signIn', async(req,res)=>{
    let username = req.body.username
    // let password = req.body.password
    let user = await User.findOne({username: username})
    if (!user){
        return res.send("No user registered")
    }
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            user = {username: username}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken})
            // res.send('success')
        }
    }catch(err){
         console.log(err)
         res.send("Wrong Password")
    }

})

routes.get('/logout',authenticationToken ,async function(req,res){
    const authHeader = req.headers.auth_token
    const logout = new blacklisttoken({
        token:authHeader
    })
    await logout.save()
        if(logout){
            res.send("You have been Logout")
        }
        else{
            res.send('error',err)
        } 
    
    // if(logout){
    //     res.send("You have been Logout")
    // }
    // else{
    //     res.send('error',err)
    // }
})


module.exports = routes

