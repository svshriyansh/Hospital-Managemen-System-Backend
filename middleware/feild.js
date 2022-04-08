const {PATIENT} = require('../dbUtil')

async function feildCheck(req, res, next){
    const value = Object.values(PATIENT)
    field = req.body
    const keys = Object.keys(field)
    const feildvalue = Object.values(field)
    obj = {}
    // console.log(value);
    // console.log(keys);
    // console.log(feildvalue);
    for(let i = 0;i< keys.length ;i++){
        try{
            // console.log(obj[keys[i]] = feildvalue[i]); 
            if(value.includes(keys[i])){
               obj[keys[i]] = feildvalue[i];
            }
        }catch(err){
            res.send(err)
        }
        if(obj.length == 0){
            console.log("invalid");
        }
    }
    // console.log(obj);
    req.patientDetail = obj
    next()
}
module.exports = feildCheck