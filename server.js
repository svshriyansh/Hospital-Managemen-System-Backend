const mongoose=require('mongoose');
const express = require('express');
const app = express();
const uri = "mongodb+srv://Shriyansh:Shriyansh1234@cluster0.gpzb5.mongodb.net/Star_Wars?retryWrites=true&w=majority"

//app.use(bodyParser.urlencoded({ extended: true}))
// app.use(express.json({ extended: false }));
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); 


const connectDB = async() =>{
    try{
        await mongoose.connect(uri,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        });
        console.log('MongoDB connected')
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

connectDB()
const starQuotes = require('./routes/quotes')
app.use('/',starQuotes) 

app.listen(3000, function() {
    console.log('Listning on 3000')
})
