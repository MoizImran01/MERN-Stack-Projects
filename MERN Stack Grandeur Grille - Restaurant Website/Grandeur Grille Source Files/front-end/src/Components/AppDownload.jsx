import React from 'react'
import './AppDownload.css'
import apples from '../../assets/apple.png'
import androids from '../../assets/android.png'
const AppDownload = () => {
  return (
    <div className='download-container'>
        <h2 className='app-header'>Get Better Experience on our App</h2>
        <div className="img-container">
        <img src={apples} alt="" className="app-download" />
        <img src={androids} alt="" className="android app-download" />
        </div>
    </div>
  )
}

export default AppDownload