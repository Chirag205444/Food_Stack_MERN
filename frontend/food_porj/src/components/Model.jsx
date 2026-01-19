import React from 'react'

function Model({children,onClose}) {
  return (
    <>
    <div className="fixed inset-0 flex items-center z-40  justify-center" >
      <div className="absolute inset-0 bg-black/30  backdrop-blur-sm" onClick={onClose}></div>   
      <div className="relative w-[30%] py-4  bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
    </>
  )
}

export default Model
