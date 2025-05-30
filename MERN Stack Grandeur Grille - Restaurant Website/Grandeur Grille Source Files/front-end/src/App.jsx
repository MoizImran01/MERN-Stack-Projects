import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import './index.css'
import {Route} from 'react-router-dom'
import { Routes } from 'react-router-dom'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import LoginPopup from './Components/LoginPopup'
import Footer from './Components/Footer'
import './App.css'
import Verify from './Pages/Verify/Verify'
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>: <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element = {<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App