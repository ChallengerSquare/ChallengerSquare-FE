import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/home/Home'
import Competition from '@/pages/competition/Competition'
import CompetitionSearch from '@/pages/competition/CompetitionSearch'
import CompetitionResult from '@pages/competition-result/CompetitionResult'
import SignIn from '@/pages/signin/SignIn'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/competition/search" element={<CompetitionSearch />} />
        <Route path="/competition-results" element={<CompetitionResult />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
