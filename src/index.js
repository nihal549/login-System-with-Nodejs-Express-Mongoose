const path = require('path')
const express = require('express')
const app =express()
const bodyParser =require('body-parser')
const bcrypt = require('bcryptjs')
//fetching from db
const User = require('./db/db')


//express config
const port = process.env.PORT|| 3000;
const pathDirectory =path.join(__dirname,'../public')
app.use(express.static(pathDirectory));

app.use( bodyParser.json())

//registering the users
app.post('/register',async (req,res)=>{
    const password = req.body.password
const hashedPassword = await bcrypt.hash(password, 8)
  const user = new User({userName:req.body.userName,
                         email: req.body.email,
                         password:hashedPassword})

    try {
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
  
})
//login
app.post('/login',async (req,res)=>{
  

    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({email})
        const isMatch = await bcrypt.compare(password,user.password)
       
        if (isMatch) {
            res.status(200).send()
        }
             
             
       res.status(400).send()
        
     

    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port,()=>{
    console.log("port is up at 3k")
})