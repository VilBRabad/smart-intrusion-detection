import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import VideoStream from './components/VideoStream'

function App() {

  const [mobile, setMobile] = useState("");

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home mobile={mobile} setMobile={setMobile}/>}/>
        <Route exact path="/sign-in" element={<Login/>}/>
        <Route exact path="/create-password" element={<Register mobile={mobile}/>}/>
        <Route exact path="/in" element={<LandingPage/>}/>
        <Route exact path="/vid" element={<VideoStream/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
