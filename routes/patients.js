const express = require('express')
const Patient = require('../models/patients')
const authenticationToken = require('../middleware/auth')
const {check ,validationResult} = require('express-validator')
const routes = express.Router()
const feildCheck = require('../middleware/feild')
const patients = require('../models/patients')

routes.post('/patients',authenticationToken,
[
    check("patientName","Name is reqired").not().isEmpty(),
    check("patientAge","Age is required").not().isEmpty(),
    check("patientAddress","Address is required").not().isEmpty()
],
async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        const err = {}
        let values = []

        for(let i = 0;i<error.errors.length;i++){
            if(!Object.keys(err).length){
                values.push(error.errors[i].msg)
                err['errors'] = values
            }
            else{
                values.push(error.errors[i].msg)
                err['errors'] = values
            }
        }
        if(Object.keys(err.errors).length==1){
            console.log(JSON.stringify(err))
        }
       return res.send(err)
    }
    try{
        const feild = new Patient({
            ...req.body
        })
        await feild.save()
        res.send(feild)
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
}
)

routes.get('/patients', authenticationToken , async(req,res)=>{
    try {
        const data = await Patient.find()
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

routes.get('/patients/:id', authenticationToken , async(req,res)=>{
    try {
        const data = await Patient.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

routes.put('/patients/:id', authenticationToken, feildCheck,async(req,res)=>{
    try{
        await patients.findByIdAndUpdate(req.params.id,req.patientDetail)
        res.send("updated")
    }
    catch(err){
        res.send(err)
    }
})

routes.delete('/patients/:id',authenticationToken, async(req,res)=>{
    try{
        const data = await patients.deleteOne({_id:req.params.id})
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
})

module.exports = routes