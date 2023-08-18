const mongoose= require("mongoose")

mongoose.connect('mongodb+srv://jothiskunju754:jothisfreston123@cluster0.9wdtnva.mongodb.net/LoginSignup')
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log("Failed to connect",e);
})

const LogInSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    }
})

const logInCollection=new mongoose.model("logInCollection",LogInSchema)

module.exports=logInCollection