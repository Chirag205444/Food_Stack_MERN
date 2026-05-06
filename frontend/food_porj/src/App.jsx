import React from 'react'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Mainnavigation from './components/Mainnavigation'
import axios from 'axios'
import SkeletonHome from './components/Skeletonhome'
import Addfoodrecipe from './pages/Addfoodrecipe'
import Editrecipe from './pages/Editrecipe'


const allRecipe= async()=>{
  let allRecipes=[]
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipe`).then(res=>{
      allRecipes=res.data
  })
  return allRecipes
}

const getMyrecipe=async()=>{
   let user=JSON.parse(localStorage.getItem("user"));
   let allrecipe=await allRecipe()
   return allrecipe.filter(item=>item.createdby===user?._id)
}

 const getFavorite = async () => {
  return JSON.parse(localStorage.getItem("fav")) ?? [];
};


const mainRouter=createBrowserRouter([{
  path:"/",
  element:<Mainnavigation />,
  children:[{
    path:'/',
    element:<Home />,
    loader:allRecipe,
    hydrateFallbackElement:  <SkeletonHome /> 
     },{
      path:'/myrecipe',
      element:<Home/>,
      loader:getMyrecipe,
      hydrateFallbackElement:  <SkeletonHome /> 
     }
     ,{
      path:'/favourite',
      element:<Home/>,
      loader:getFavorite,
    hydrateFallbackElement:  <SkeletonHome /> 
     },{
      path:'/addrecipe',
      element:<Addfoodrecipe/>
     },{
      path:'/editrecipe/:id',
      element:<Editrecipe />
     }
    ]
}])



function App() {
  return (
    <div>
      <RouterProvider router={mainRouter}/>
    </div>
  )
}

export default App

 {/* <Routes> */}
          {/* <Route path='/' element={<Mainnavigation />}>  /* main navigation route which contains navbar,outlet, footer  */}
               {/* <Route path='/' element={<Home />}/>       for / outlet is home so render home */}
          {/* </Route> */}
       {/* </Routes> */}