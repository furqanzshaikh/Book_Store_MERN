import React,{useState,useEffect} from 'react'
import NoImgSelected from '../../assets/no-image-selected.jpg'
import {Link,useNavigate,useParams} from 'react-router-dom'
import { FaBackspace } from 'react-icons/fa'
const EditBook = () => {
  const navigate =useNavigate()
  const urlslug = useParams()
  const baseUrl =`http://localhost:4000/api/books/${urlslug.slug}`
  const [title,setTitle] = useState('')
  const [bookId,setBookId] = useState('')
  const [slug,setSlug] = useState('')
  const [stars,setStars] = useState(0)
  const [description,setDescription] = useState('')
  const [category,setCategory] = useState([])
  const [thumbnail,setThumbnail] = useState(null)
  const [submitted,setSubmitted] = useState(null)
  const [image,setImage]=useState(NoImgSelected)



const fetchData = async ()=>{
  try {
    const response = await fetch(baseUrl)
    if(!response.ok){
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    setBookId(data._id)
    setTitle(data.title)
    setCategory(data.category)
    setDescription(data.description)
    setSlug(data.slug)
    setStars(data.stars)
    setThumbnail(data.thumbnail)

  } catch (error) {
    
  }
}


useEffect(() => {
  
  fetchData()
}, [])












  const updateBook = async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('bookId',bookId)
    formData.append('title',title)
    formData.append('slug',slug)
    formData.append('stars',stars)
    formData.append('description',description)
    formData.append('category',category)
    if(thumbnail){
      formData.append('thumbnail',thumbnail)
    }

    try {

      const response = await fetch('http://localhost:4000/api/books',{
        method:'PUT',
       body:formData




      })







    

      if(response.ok){
        setTitle('')
        setSlug('')
        setCategory('')
        setDescription('')
        setStars(0)
        setSubmitted(true)
      }


    } catch (error) {
      console.log(error)
    }
    
  }
  
 const HandleCategory = (e) =>{
  setCategory(e.target.value.split(",").map((category) => category.trim()));

 }
 
const onImageChange = (e)=>{
  if(e.target.files && e.target.files[0]){
    setImage(URL.createObjectURL(e.target.files[0]))
    setThumbnail(e.target.files[0])
  }
}

const removeBook = async (e)=>{
  e.preventDefault()
  try {
  const response = await fetch('http://localhost:4000/api/books/'+ bookId,
  {method:'DELETE',

  }
  )
  if(response.ok){
    navigate('/books')
    alert('Deleted Book Succesfully')
  }
  } catch (error) {
    console.log(error)
  }  

}

  return (
    <div>
      <h1>Edit Book</h1>
      <button className='back-btn'><Link to={'/books'}><FaBackspace/> </Link></button>
      <p>This is where we use NodeJs ,Express to Push Data to database</p>
    
      <button className='delete' onClick={removeBook}>Delete</button>
    

    
    {submitted ? (
      <p>Data Submitted Succesfully</p>
    ):(
      <form  className='bookdetails' onSubmit={updateBook}>
        <div className='col-1'>
      <label >
        Upload Thumbnail
      </label>
      {image ? (
              <img src={image} alt="preview img" />
      
      ):(
              <img src={`http://localhost:4000/uploads/${thumbnail}`} alt="preview img" />
      
      )}
      <input 
      onChange={onImageChange}
      type="file" accept='image/gif ,image/png image/jpeg image/jpg image/svg' />
        </div>
        <div className='col-2'>
        <div>
        <label >Title</label>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        </div>
        <div>
        <label >Slug</label>
        <input type="text" value={slug} onChange={(e)=>{setSlug(e.target.value)}} />

        </div>
        <div>
        <label >Stars</label>
        <input type="text" value={stars} onChange={(e)=>{setStars(e.target.value)}} />

        </div>
        <div>
        <label >Description</label>
        <textarea rows={4} cols={50}  value={description} onChange={(e)=>{setDescription(e.target.value)}} />
        </div>
        <div>
        <label >Category (Seprated By Commas)</label>
        <input type="text" value={category} onChange={HandleCategory} />

        </div>
        <input type="submit" />
        </div>
        
      </form>


      
)}
    </div>
  )

    }
export default EditBook