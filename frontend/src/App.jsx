import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Home from './routes/Home'
import About from './routes/About'
import './index.css'
import Books from './routes/Book/Books'
import SingleBook from './routes/Book/SingleBook'
import CreateBook from './routes/Book/CreateBook'
import EditBook from './routes/Book/EditBook'

const App = () => {
  return (
    <>
    
<Router>
<Header/>
<Routes>
<Route path='/' element={<Home/>} />
<Route path='/about' element={<About/>} />
<Route path='/books' element={<Books/>} />
<Route path='/books/:slug' element={<SingleBook/>} />
<Route path='/createbook' element={<CreateBook/>} />
<Route path='/editbook/:slug' element={<EditBook/>} />

</Routes>
<Footer/>
</Router>
    </>
  )
}

export default App