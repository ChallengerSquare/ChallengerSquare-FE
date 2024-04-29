import './App.css'
import Home from '@pages/Home/Home'
import Competition from '@pages/Competition/Competition'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competition" element={<Competition />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
