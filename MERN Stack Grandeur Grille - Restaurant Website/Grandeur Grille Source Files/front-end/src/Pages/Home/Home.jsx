import React, { useState } from 'react'
import './Home.css'
import { Header } from '../../Components/Header'
import Menu from '../../Components/Menu'
import FoodDisplay from '../../Components/FoodDisplay'
import AppDownload from '../../Components/AppDownload'
const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className='home'>
        <Header/>
        <Menu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
     
    </div>
  )
}

export default Home