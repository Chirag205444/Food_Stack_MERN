import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom';
import img from '../assets/image.png'
import { FaStopwatch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { useEffect } from 'react';
import Showdetails from './Showdetails';

function Recipeitems() {
   const recipe=useLoaderData();
   const [allRecipe,setRecipe]=useState([]);
   const [open,setOpen] =useState(false);
   const [search,setSearch] = useState();
   const [itemid,setId] =useState("");
  const BASE_URL=import.meta.env.VITE_BACKEND_URL;
   const [isfavorite,setIsfavorite]=useState(() => {
  const favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  return favItems.map(item => item._id); 
});

 const handleSearch=(e)=>{
      setSearch(e.target.value)
    }

   useEffect(() => {
  if (search && search.length > 3) {
    setRecipe(
      recipe.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  } else {
    setRecipe(recipe); 
  }
}, [search, recipe]);


   const favItems =JSON.parse(localStorage.getItem("fav")) ?? []
   let path=window.location.pathname==="/myrecipe" ? true : false;
   const updateisFavorite = (rec) => {
      setIsfavorite((prev) =>
       prev.includes(rec._id)
      ? prev.filter((id) => id !== rec._id) 
      : [...prev, rec._id]                  
  );
};


   const onDelete = async(id)=>{
       const favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
       const updatedFavs = favItems.filter(item => item._id !== id);
       localStorage.setItem("fav", JSON.stringify(updatedFavs));
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/recipe/${id}`).then((res)=>{
         console.log(res.data.message)
         setRecipe(recipe=>recipe.filter(recipe=>recipe._id !== id))
      })
   }

   const updateFavorite=(item)=>{
      let favItem=favItems.filter(favItems=>favItems._id !== item._id);
      let favorite=favItems.filter(recipe=>recipe._id === item._id).length===0 ? [...favItems,item] : favItem;
      localStorage.setItem("fav",JSON.stringify(favorite));
    //  setIsfavorite([...isfavorite,favorite._id])
   }
   
  

  return (
    <>
       <div className='w-full  bg-[#b4f0e5] px-10 py-15 h-screen'>
        <h1 className='text-3xl pb-1 font-bold'>Recipes</h1>
         <div className='px-10 h-full rounded-sm  bg-[#ededee]  w-full flex flex-wrap content-start gap-5 overflow-y-scroll shadow-xl py-10'>
            <input type="text" name='text' onChange={(e)=>handleSearch(e)} className='w-full h-10 border-2 border-gray-600 rounded-4xl placeholder:text-gray-600 outline-none px-4 py-1' placeholder='Search item...' />
          {allRecipe && allRecipe.map((rec)=>(
            <div key={rec._id} className='h-55 w-40 relative  rounded-xl overflow-hidden shadow-xl  bg-[#8ef6e3]  '>
               <div onClick={()=>{setOpen(prev=>!prev);setId(rec._id)}} className='h-[60%] cursor-pointer relative overflow-hidden flex items-center bg-gray-500 w-full'>
                   <img className='w-full  h-full object-cover' src={`${BASE_URL}/images/${rec.coverImage}`} alt="" />
                   {(path)&& <div className='absolute top-0 right-0 p-2'><Link to={`/editrecipe/${rec._id}`}><FaEdit className='cursor-pointer' /></Link></div>}        
                </div> 
                <div className='mt-2 flex flex-col  justify-center items-center'>
                    <h1 onClick={()=>{setOpen(prev=>!prev);setId(rec._id)}} className='font-semibold cursor-pointer text-md'>{rec.title}</h1>
                <div className='flex absolute bottom-0 w-full justify-between pb-3 px-4'>
                     <div className='text-sm font-medium flex justify-center items-center'><FaStopwatch className=' text-blue-500'/>{rec.time}</div>
                     <div className='flex justify-center items-center'>
                      {(!path) ?<FaHeart onClick={()=>{updateFavorite(rec);updateisFavorite(rec)}} className={`cursor-pointer ${isfavorite.includes(rec._id) ? 'text-red-700' : 'text-gray-400'}`}/> :
                         <div className=' flex gap-2'><MdDelete onClick={()=>{onDelete(rec._id);}} className='text-red-700 text-xl cursor-pointer '/> </div>
                      }
                      </div>
                </div>
                </div>
                
          </div>
          ))
        }
        {(allRecipe.length === 0) && (
           <div className='w-full flex justify-center mt-20'>
              <p className='text-gray-500 font-semibold text-2xl'>No recipes yet...!</p>
           </div>
        )}
       
        </div>
       </div>
       {(open) && <Showdetails onclose={()=>setOpen(false)} itemid={itemid} />}
    </>
  )
}

export default Recipeitems
