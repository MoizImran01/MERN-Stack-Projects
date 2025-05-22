import React from 'react'
import menu1 from '../../assets/menu_1.png'
import menu2 from '../../assets/menu_2.png'
import menu3 from '../../assets/menu_3.png'
import menu4 from '../../assets/menu_4.png'
import menu5 from '../../assets/menu_5.png'
import menu6 from '../../assets/menu_6.png'
import menu7 from '../../assets/menu_7.png'
import menu8 from '../../assets/menu_8.png'
import './Menu.css'
const Menu = ({category, setCategory}) => {
  return (
    <div className='menu-container'>
        <div className="menu-header-container"><h2 className='menu-header'>Explore our delectable menu</h2>
        </div>
        <div className="text-container"><p className="menu-text">Explore from a carefully curated diverse array of dishes bound to satisfy your cravings.</p></div>
        <div className="menu-options">
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Salad"? "All": "Salad")}>
                < img id={category==="Salad"?"active":""} className='item' src={menu1}/>
                <p className="item-text">Salads</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Rolls"? "All": "Rolls")}>
                < img id={category==="Rolls"?"active":""} className='item' src={menu2}/>
                <p className="item-text">Rolls</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Desserts"? "All": "Desserts")}>
                < img id={category==="Desserts"?"active":""} className='item' src={menu3}/>
                <p className="item-text">Desserts</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Sandwiches"? "All": "Sandwiches")}>
                < img id={category==="Sandwiches"?"active":""} className='item' src={menu4}/>
                <p className="item-text">Sandwiches</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Cakes"? "All": "Cakes")}>
                < img id={category==="Cakes"?"active":""} className='item' src={menu5}/>
                <p className="item-text">Cakes</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Chinese"? "All": "Chinese")}>
                < img id={category==="Chinese"?"active":""} className='item' src={menu6}/>
                <p className="item-text">Chinese</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Pastas"? "All": "Pastas")}>
                < img id={category==="Pastas"?"active":""} className='item' src={menu7}/>
                <p className="item-text">Pastas</p>
            </div>
            <div className="menu-item" onClick={()=>setCategory(prev=>prev==="Noodles"? "All": "Noodles")}>
                < img id={category==="Noodles"?"active":""} className='item' src={menu8}/>
                <p className="item-text">Noodles</p>
            </div>
        </div>
    </div>
  )
}

export default Menu