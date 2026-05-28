const bookModel = require('../models/book.model')
const path = require('path')
const fs = require('fs')

// showing books on index page
const showBooks = async (req, res) => {
    const books = await bookModel.find()
    res.render('index', { books })
}

// add page render
const addBookPage = (req,res)=>{
    res.render('add')
}

// adding new book
const addBook = async (req, res) => {
    await bookModel.create({
        name: req.body.name,
        img: req.file.filename,
        author: req.body.author,
        category: req.body.cat,
        price: req.body.price
    })

    res.redirect('/')
}

// edit page rendering
const getEditPage = async(req,res)=>{
  const book = await bookModel.findById(req.params.id)
  console.log(book)
  res.render('edit',{book})
}

const editBook = async (req, res) => {
    const book = await bookModel.findById(req.params.id)
    const updateData = {
        name: req.body.name,
        author: req.body.author,
        category: req.body.cat,
        price: req.body.price
    };
    // if new image uploaded
    if (req.file) {
        // old image delete
        if (book.img) {
            const oldImagePath = path.join(__dirname, '../uploads', book.img)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath)
            }
        }
        // save new image
        updateData.img = req.file.filename
    }
    await bookModel.findByIdAndUpdate(req.params.id, updateData)
    res.redirect('/')
}

// deleting book
const deleteBook = async (req, res) => {

    const book = await bookModel.findById(req.params.id)

    if (book && book.img) {

        const imagePath = path.join(__dirname, '../uploads', book.img)

        if (fs.existsSync(imagePath)) {
            try {
                fs.unlinkSync(imagePath)
                console.log('Image Deleted Successfully:', book.img)
            } 
            catch (err) {
                console.error('Error deleting image:', err.message)
            }
        } 
        else {
            console.log('Image file not found at:', imagePath)
        }
    } 
    await bookModel.findByIdAndDelete(req.params.id)

    res.redirect('/')
}


module.exports = {
    showBooks,
    addBookPage,
    addBook,
    getEditPage,
    editBook,
    deleteBook
}