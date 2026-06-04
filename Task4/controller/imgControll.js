const imgModel = require('../models/imgModel')

const showImage = async (req,res)=>{
    const images = await imgModel.find()
    res.render('index',{images})
}

const uploadImage = async (req,res)=>{
    // console.log(req.file.filename)
    await imgModel.create({
        img:req.file.filename
    })
    res.redirect('/')
}


module.exports= {
    showImage,
    uploadImage
}