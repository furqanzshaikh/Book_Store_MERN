import React from 'react'
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/react.svg'
const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" /> ReactJs
      </Link>

      <nav>
        <Link to="/">Home</Link>
     
        <Link to="/books">Books</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}

export default Header