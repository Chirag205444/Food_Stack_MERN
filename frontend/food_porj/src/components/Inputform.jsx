import React, { useState } from 'react'
import axios from 'axios'

function Inputform({onClose}) {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [issignup,setisSignup]=useState(false)
  const [error,setError]=useState(false)
  
  const setemail=(e)=>{
    setEmail(e.target.value);
  }
  const setpassword=(e)=>{
      setPassword(e.target.value)
  }


  const handleOnSubmit=async(e)=>{
     e.preventDefault()
    try{
      const endpoint=(issignup) ? "signup" : "login"
     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`,{email,password})
     .then((res)=>{
          localStorage.setItem("token",res.data.token);
         console.log("data",res.data)
          localStorage.setItem("user",JSON.stringify(res.data.user));
           onClose()
     })
    }catch(err){
      setTimeout(()=>{
        setError(prev => ! prev)
      },4000)
      setError(prev => ! prev)
      console.error("Error:", err.response?.data || err.message);
    }
  }
  return (
    <>
      <form className=' flex flex-col gap-3 h-full p-5' onSubmit={(e)=>{handleOnSubmit(e);}} action="">
        <div className='flex items-center gap-9 '>
            <label className='text-green-400 font-bold' htmlFor="">E-mail</label>
            <input className='w-[70%] outline-none border-2 border-gray-700 rounded-sm h-[30%] px-3 py-2' value={email} required type="email" name="email" id="" placeholder='email' onChange={(e)=>{setemail(e)}} />
        </div>
        <div className='flex items-center gap-3 '>
            <label className='text-green-400  font-bold' htmlFor="">Password</label>
            <input className='w-[70%] outline-none border-sm border-2 border-gray-700 rounded-sm h-[30%] px-3 py-2' value={password}  required type="password" name="email" id="" placeholder='email' onChange={(e)=>{setpassword(e)}} />
        </div>
          <div className='w-full pr-5 flex items-center mt-4 justify-between'>
             <p className='text-blue-500 cursor-pointer text-sm'onClick={()=>setisSignup(prev => !prev)} ><u>{(issignup) ? "already have an account" : "create new account"}</u></p>
            <button type='submit' className='w-[35%] px-3 py-2 cursor-pointer rounded-sm font-semibold bg-green-500'>{(issignup) ? "Signup" : "Login"}</button>
          </div>
      </form>
      <div className='width-full pl-3 items-center font-semibold text-xs text-red-600'> {error && <p>**Something went wrong, Try again..!!</p>}</div>
    </>
  )
}

export default Inputform
