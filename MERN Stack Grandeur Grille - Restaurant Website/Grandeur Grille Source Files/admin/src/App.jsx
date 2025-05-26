import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Siderbar from './Components/Siderbar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import { Add } from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Siderbar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App