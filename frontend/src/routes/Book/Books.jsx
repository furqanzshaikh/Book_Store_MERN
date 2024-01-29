import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {
  const BaseUrl = 'http://localhost:4000/api/books'
  const [data, setData] = useState([])
  const [isLoading,setIsLoading]= useState(true)
  const [error,setError]= useState(null)
  const [category,setcategory]= useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {

      let Url = BaseUrl;
      if (category){
        Url+=`?category=${category}`
      }


        const response = await fetch(Url)

        if (!response.ok) {
          throw new Error('Error while Fetching data')
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false)



      } catch (error) {
        console.log(error)
        setError("Error while fetching data")
        setIsLoading(false)
      }
    }
    fetchData()
  }, [category])


  return (
    <div>
      <h1>Books</h1>
      <Link to="/createbook">Add Book</Link>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>
      <h2>Fetech Example</h2>

      <div className="filters">
        <label>Categories</label>
        <select onChange={(e)=> setcategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">other</option>
        </select>
      </div>


    {isLoading ? (<p>Loading...</p>): error ? (
      <p>{error}</p>
    ) :      
    (<ul className='books'>
        {data.map((book) => (
          <li key={book._id}>
            <Link to={`/books/${book.slug}`}>
              <img src={`http://localhost:4000/uploads/${book.thumbnail}`} alt={book.title} />
              <h3>{book.title}</h3>
            </Link>
          </li>
        ))}

      </ul>)}


    </div>
  )
}

export default Books