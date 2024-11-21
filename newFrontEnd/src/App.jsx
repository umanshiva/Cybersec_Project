import React,{useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App