import React from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Model from './Model'
import Inputform from './Inputform'
import { useEffect } from 'react'


function Navbar() {
  const[open,setOpen]=useState(false)
  const token=localStorage.getItem("token")
  const[wantlogin,setwantLogin]=useState((token)? false : true)
  let user=JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
     setwantLogin(token ? false :true)
  },[token])

  const openmodal=()=>{
    if(token){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setwantLogin(true);
    }else{
        setOpen(true);
    }
    
  }
  return (
    <>
        <header className='fixed top-0 left-0 bg-white flex z-50 py-2 shadow-md w-full pl-20 pr-10 justify-between'>
            <div className='h-10 flex items-center '><h1 className='text-xl cursor-default font-bold'>Food Blog</h1></div>
            <ul className='flex w-[40%] font-semibold justify-between'>
            <NavLink to="/" onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `cursor-pointer flex justify-center items-center px-2 py-1 rounded-xl ${
                     isActive ? "bg-green-200" : ""}`}>Home</NavLink>

            <NavLink  to={(!wantlogin) ?"/myrecipe":"/"} onClick={() => {setOpen(false); (wantlogin) && openmodal()}}
                  className={({ isActive }) =>`cursor-pointer flex justify-center items-center px-2 py-1 rounded-xl ${isActive ? "bg-green-200" : ""}` }>My Recipe</NavLink>

            <NavLink to={(!wantlogin) ?"/favourite":"/"} onClick={() => {setOpen(false); (wantlogin) && openmodal() }}
                className={({ isActive }) =>
                     `cursor-pointer flex justify-center items-center px-2 py-1 rounded-xl ${
                       isActive ? "bg-green-200" : "" }`}>Favourites</NavLink>

            <Link to='/' onClick={() => openmodal()} className={`cursor-pointer flex flex-col justify-center items-center px-2 rounded-xl`}> <div>{(wantlogin) ? "Login" :"Logout"}</div><div className='text-xs font-normal'>{user && user.email ? user.email : ""}</div></Link>
            </ul>
        </header>
      
          {(open) && <Model onClose={()=>setOpen(false)} >
            <Inputform  onClose={()=>setOpen(false)}/>
          </Model> }
      
    </>
  )
}

export default Navbar
