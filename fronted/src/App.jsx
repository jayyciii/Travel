import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div className='bg-bgPrimary min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-grow'>
          <Outlet />
        </div>
        <footer>Footer</footer>
      </div>

    </>
  )
}

export default App
