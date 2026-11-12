// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path = "/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
