import React, { useState,useEffect } from 'react'
import axios from 'axios'

function Showdetails({onclose,itemid}) {
    const [selrecipe,setRecipe]=useState(null)
   
      useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipe/${itemid}`)
      .then((res) => {
            setRecipe(res.data.recipe); 
      })
      .catch((err) => console.error(err));
  }, [itemid]);
   
  if (!selrecipe) {
    return (
      <div className="fixed inset-0 flex items-center z-40 justify-center">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onclose}></div>
        <div className="relative h-[75%] w-[75%] flex items-center justify-center bg-white rounded-lg shadow-lg">
          <p className="text-green-400 text-xl">Loading recipe...</p>
        </div>
      </div>
    );
}

  return (
    <>
       <div className="fixed inset-0 flex items-center z-40  justify-center" >
      <div className="absolute inset-0 bg-black/30  backdrop-blur-sm" onClick={onclose}></div>   
      <div className="relative h-[75%] w-[75%] flex flex-col gap-10 py-10 px-7 border-2 border-green-400 bg-white rounded-lg shadow-lg">
         <div className='flex justify-around '>
         <div className='flex gap-2 items-center justify-center  '><h1 className='text-xl font-semibold text-green-400'>Title :</h1><p className='text-xl  font-semibold'>{selrecipe.title}</p></div>
         <div className='flex gap-2 items-center justify-center  '><h1 className='text-xl font-semibold text-green-400'>Time :</h1><p className='text-xl font-semibold'>{selrecipe.time}</p></div>
         </div>
          <div className='flex flex-col px-10 gap-4'>
         <div className='flex flex-col gap-1'>
            <h1 className='text-xl font-semibold text-green-400'>Ingredients :</h1>
            <div className='min-h-20 ml-10'><p>{selrecipe.ingredients.join(",")}</p></div>
          </div>
        
         <div className='flex flex-col gap-1'>
            <h1 className='text-xl font-semibold text-green-400'>Instructions :</h1>
            <div className='min-h-20 ml-10'><p>{selrecipe.instructions}</p></div>
         </div>
         </div>
      </div>
    </div> 
    </>
  )
}

export default Showdetails
