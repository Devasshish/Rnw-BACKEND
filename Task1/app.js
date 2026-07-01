const http= require('http')
const fs = require('fs')

const reqHand = (req,res)=>{
    let filename = ""
    switch(req.url){
        case "/":
            filename='home.html'
            break
        case '/about':
            filename="about.html"
            break
        case '/contact':
            filename="contact.html"
            break
        default:
            filename="404.html"
    }
    fs.readFile(filename,(err,result)=>{
        if(!err){
            res.end(result)
        }
    })
}

const server = http.createServer(reqHand);
server.listen(3000,(req,res)=>{
    console.log("Server is runniong on port 3000")
})