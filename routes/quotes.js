const express = require('express')
const router = express.Router() 
const path = require("path")
const starWarModel = require('../model/quotesM')

// const app = express()
const dir = path.join(__dirname, "../", "index.html")
router.get('/', (req, res) => {
    res.sendFile(dir)
});
router.post('/quotes',async (req, res)=>{
    let body = req.body
    try{
    let data = new starWarModel({
        name: body.name,
        quote: body.quote
    })
    await data.save()
    res.send("Data Added Successfully")
    }catch(e){
        console.log(e)
        res.status(501).send("Internal Server Error")
    }
})
router.get('/quotes', (req,res)=>{
    res.send("QUOTES GET ROUTE")
    console.log('Get Request')
}); 
module.exports = router