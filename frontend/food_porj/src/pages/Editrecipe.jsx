import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Editrecipe()  {
    const [recipedata,setRecipedata]=useState({title: "", ingredients: "", instructions: "",time: "",file: null})
    const navigate=useNavigate();
    let {id}=useParams()
    

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipe/${id}`).then((res)=>{
                const data = res.data.recipe;
                 setRecipedata({
                    title: data.title ,
                    ingredients: Array.isArray(data.ingredients) ? data.ingredients.join(",") : "",
                    instructions: data.instructions || "",
                    time: data.time || "",

                 })
            })
        }
        getData();
    },[])


    
    const onHandlechange=(e)=>{
        let val=(e.target.name==="ingredients")? e.target.value.split(",") :(e.target.name==="file")? e.target.files[0] :e.target.value;
        setRecipedata(prev => ({...prev,[e.target.name]:val}))
    }
    
    const onHandlesubmit=async(e)=>{
        try{
            e.preventDefault()
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/recipe/${id}`,recipedata,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }}).then((res)=>{
                    console.log(res.data.message)
                    navigate("/")
                })
            }catch(err){
                console.error(err.message)
            }
        }
        
        return (
            <>
      <div className='w-full h-screen pt-20 flex justify-center '>
        <form action="" onSubmit={onHandlesubmit} className='w-[60%] flex flex-col gap-4'>
        <div className='w-full flex justify-between'>
            <label htmlFor="" className='font-semibold '>Title</label>
            <input type="text" value={recipedata.title} name='title' onChange={onHandlechange} className='w-[60%] border-2 px-2 py-1 border-gray-600 rounded-sm outline-none'/>
        </div>
        <div className='w-full flex justify-between'>
            <label htmlFor="" className='font-semibold '>Time</label>
            <input type="text" value={recipedata.time} name='time' onChange={onHandlechange}  className='w-[60%] border-2 px-2 py-1 border-gray-600 rounded-sm outline-none'/>
        </div>
        <div className='w-full flex justify-between'>
            <label htmlFor="" className='font-semibold '>Ingredients</label>
            <textarea name="ingredients" value={recipedata.ingredients} onChange={onHandlechange} id="" className='w-[60%] min-h-25 border-2 px-2 py-1 border-gray-600 rounded-sm outline-none'></textarea>
        </div>
        <div className='w-full flex justify-between'>
            <label htmlFor="" className='font-semibold '>Instruction</label>
            <textarea name="instructions" value={recipedata.instructions} onChange={onHandlechange} id="" className='w-[60%] border-2 px-2 py-1 min-h-25  border-gray-600 rounded-sm outline-none'></textarea>
        </div>
        <div className='w-full flex justify-between'>
            <label htmlFor="" className='font-semibold '>Recipe image</label>
            <input type="file" name="file" onChange={onHandlechange} className='w-[60%] border-2 file:border file:px-2  file:rounded-sm file:bg-gray-200 file:shadow-2xl file:shadow-gray-600 px-2 py-1 border-gray-600 rounded-sm outline-none' />
        </div>
        <div className='w-full flex justify-center items-center'>
            <button  className='mt-10 cursor-pointer px-3 py-2 active:scale-95 active:bg-[#63dfb5] transition bg-[#2AFEB7] text-gray-900 shadow-md shadow-gray-800  rounded-sm'>Edit Recipe</button>
        </div>
        </form>
      </div>
    </>
  )
}

export default Editrecipe
