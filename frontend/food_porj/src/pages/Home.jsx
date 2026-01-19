import React from 'react'
import food from '../assets/image.png'
import Recipeitems from '../components/Recipeitems'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Model from '../components/Model'
import Inputform from '../components/Inputform'


function Home() {
   const navigate=useNavigate()
   const [open,setOpen] =useState(false)

   const addRecipe=()=>{
    let token=localStorage.getItem("token")
    if(token)
     navigate("/addrecipe")
    else{
      setOpen(true)
    }
   }

  return (
    <>
     <div className='w-full h-screen relative'>
         <div className=' w-full h-[70%]  flex'>
        <div className='h-full pl-20 pt-20  w-[65%]'>
        <h1 className='text-4xl cursor-default font-bold'>Food Recipe</h1>
        <p className='mt-10 cursor-default font-semibold text-sm text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error magnam molestias nam asperiores quibusdam modi iusto magni tempora quidem numquam doloribus optio eligendi vitae ut exercitationem architecto, voluptatibus quod ratione.</p>
        <button onClick={addRecipe}  className='mt-10 active:scale-95 transition cursor-pointer px-3 py-2 bg-black text-white rounded-sm'>Share Your Recipe</button>
      </div>
      <div className='w-[35%] py-10 px-15  h-full  flex justify-center items-center  overflow-hidden'>
        <img className='w-full object-cover h-full' src={food} alt="" />
      </div>
      </div>

      <div className=' absolute bottom-0 w-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fillOpacity="0.3" d="M0,32L30,48C60,64,120,96,180,96C240,96,300,64,360,74.7C420,85,480,139,540,144C600,149,660,107,720,128C780,149,840,235,900,250.7C960,267,1020,213,1080,213.3C1140,213,1200,267,1260,282.7C1320,299,1380,277,1410,266.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
      </div>
     </div>
     <div>
        <Recipeitems />
     </div>
     {(open) && <Model onClose={()=>setOpen(false)} >
            <Inputform  onClose={()=>setOpen(false)}/>
          </Model> }
    </>
  )
}

export default Home
