const express = require('express')
const authenticationToken = require('../middleware/auth')
const {check ,validationResult} = require('express-validator')
const routes = express.Router()
const recordCheck = require('../middleware/record')
const MedicalRecord = require('../models/medicalRecord')

routes.post('/MedicalRecord',authenticationToken,
[
    check("examinDate","Examin Date is reqired").not().isEmpty(),
    check("problem","Problem is required").not().isEmpty(),
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
        const feild = new MedicalRecord({
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

routes.get('/MedicalRecord', authenticationToken , async(req,res)=>{
    try {
        const data = await MedicalRecord.find()
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

routes.get('/MedicalRecord/:id', authenticationToken , async(req,res)=>{
    try {
        const data = await MedicalRecord.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})


routes.put('/MedicalRecord/:id', authenticationToken, recordCheck ,async(req,res)=>{
    try{
        // console.log(req.data(recordCheck));
        // console.log(req.updatedVal);
        await MedicalRecord.findByIdAndUpdate(req.params.id,req.updatedVal)
        
        res.send("Updated")
    }
    catch(err){
        res.send(err)
    }
    
})

routes.delete('/MedicalRecord/:id',authenticationToken, async(req,res)=>{
    try{
        const data = await MedicalRecord.deleteOne({_id:req.params.id})
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
})

module.exports = routes