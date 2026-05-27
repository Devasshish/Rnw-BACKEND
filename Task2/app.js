const express = require('express')
const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

let tasks = [
    { id: 1, name: "task1 " }
]

app.get('/', (req, res) => {
    res.render("home",{tasks});
})

app.get('/add',(req,res)=>{
    res.render("add")
})

app.post('/add',(req,res)=>{
    const {task}= req.body
    tasks.push({id:Date.now(),name : task})
    res.redirect('/')
})

app.get('/edit/:id',(req,res)=>{
    const existingTask = tasks.find(task => task.id===req.params.id)
    res.render('edit',{existingTask})
})



app.get('/delete/:id',(req,res)=>{
    tasks = tasks.filter(task=> task.id !=req.params.id)
    res.redirect('/')
})

app.listen(5000, (req, res) => {
    console.log("Server is running on port 5000")
})