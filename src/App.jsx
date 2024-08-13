import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Blog from './components/Blog/Blog'
import Admin from './components/Admin/Admin'
import Auth from './components/Auth/Auth'
import { RouterProvider } from 'react-router-dom'
import router from './route'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('loggedIn'))
  }, [])

 

  return (
    <>
      <RouterProvider router={router} >

        
      </RouterProvider>

    </>
  )
}

export default App
