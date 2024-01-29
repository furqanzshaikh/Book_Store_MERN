import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
function singleBook() {
  const [data, setData] = useState([]);
  const urlSlug = useParams();
  const baseUrl = `http://localhost:4000/api/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function StarRating({ numberOfStars} ) {
    const stars = [];

    for(let i = 0; i < numberOfStars; i++ ) {
      stars.push(<span key={i}><FaStar /></span>)
    }

    return <div>Rating: {stars}</div>
  }

  return (
    <div>

      <button className="back-btn">
        <Link to={"/books"}><AiOutlineArrowLeft /></Link>
      </button>
   
 
    
     

    <div className="bookdetails">
      <div className="col-1">
        <img src={`http://localhost:4000/uploads/${data?.thumbnail}`}
        alt={data?.title} />
        
      </div>

      <div className="col-2">
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <StarRating numberOfStars={data?.stars} />

        <p>Category</p>
        <ul>
          {data?.category?.map((item, index)=> (
            <li key={index}>{item.toUpperCase()}</li>
          ))}
        </ul>

        <button id="edit">
          <Link to={`/editbook/${data.slug}`}>Edit</Link>
          </button>




      </div>

    </div>








    </div>
  );
}

export default singleBook;