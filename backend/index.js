const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 6000
const app = express()
const connectDB = require('./connection/connectDB')
const Book = require('./models/Books')
const multer = require('multer')
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static("uploads"))

app.get('/', (req,res)=>{
    res.json('Hello boi')
})

app.get('/api/books', async (req,res)=>{
    try {

    const category = req.query.category
    


    const filter = {};
    if(category){
        filter.category=category
    }

    const data = await Book.find(filter)
    res.json(data)
    } catch (error) {
    res.status(500).json({error:'error while fetching data'})    
    }
})




app.get('/api/books/:slug', async (req,res)=>{
    try {
        const slugParam =  req.params.slug
        const data = await Book.findOne({slug:slugParam})
        res.status(200).json(data)
    } catch (error) {
    res.status(500).json({error:'error while fetching data'})    
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
  
  app.post("/api/books", upload.single("thumbnail")  ,async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
  
      const newBook = new Book({
        title: req.body.title,
        slug: req.body.slug,
        stars: req.body.stars,
        description: req.body.description,
        category: req.body.category,
        thumbnail: req.file.filename,
      })
  
      await Book.create(newBook);
      res.json("Data Submitted");
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching books." });
    }
  });

app.put('/api/books/', upload.single('thumbnail'),async (req,res)=>{
    try {
        const bookId = req.body.bookId
        const UpdateBook = {
            title:req.body.title,
            slug:req.body.slug,
            description:req.body.description,
            stars:req.body.stars,
            category:req.body.category

        }

        if(req.file){
            UpdateBook.thumbnail=req.file.filename
        }



        await Book.findByIdAndUpdate(bookId,UpdateBook)
        res.status(201).json(UpdateBook)
    } catch (error) {
    res.status(500).json({error:'error while fetching data'})    
    }
})

app.delete('/api/books/:id', async(req,res)=>{
    try {
        const {id} = req.params
       const deleteBook = await Book.findByIdAndDelete(id)
       res.status(200).json(deleteBook)
    } catch (error) {
        console.log(error)
        res.json({error:error})
    }
})

app.get('*',(req,res)=>{
    res.sendStatus(404)
})

app.listen(PORT,()=>{
    console.log(`SERVER STARTED ON PORT ${PORT}`)
})
