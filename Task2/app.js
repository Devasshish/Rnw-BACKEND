const express = require('express')
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

let users = [
    {id:1,name:"Dhruval",email:"dhruval@gmail.com"},
    {id:2,name:"Sujit",email:"sujit@gmail.com"},
]

app.get('/',(req,res)=>{
    res.render('index',{users})
})

app.get('/add',(req,res)=>{
    res.render('add')
})
app.post('/add',(req,res)=>{
    
    const {name,email}=req.body
    users.push({id:Date.now(),name,email})
    res.redirect('/')  
})

app.get('/edit/:id',(req,res)=>{
    const user = users.find(u=>u.id===req.params.id)
    res.render('edit',{user})
})

app.post('/edit/:id',(req,res)=>{
    const {name,email}=req.body
    users  = users.map(u=>u.id==req.params.id ? {...u, name , email} : u)
    res.redirect('/')
})

app.listen(8000,()=>{
    console.log("Server running")
})