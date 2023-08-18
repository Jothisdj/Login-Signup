const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const expresshandlebar=require("express-handlebars")
const logInCollection=require("./mongodb")
const { Collection } = require("mongoose")
const port = process.env.PORT || 3000;
app.use(express.json())


const templatePath=path.join(__dirname,'../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);



app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.static(publicPath))



app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{

const data={
    name:req.body.name,
    password:req.body.password
} 

await logInCollection.insertMany([data])

res.render("home")

})
app.post("/login",async(req,res)=>{

    try{
        const check=await logInCollection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong Password")
        }
    }
    catch{
        res.send("Wrong Details")
    }
    
    })

app.listen(3000,()=>{
    console.log("port connected");
})