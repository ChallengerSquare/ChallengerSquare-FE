import './App.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/home/Home'
import Competition from '@/pages/competition/Competition'
import CompetitionSearch from '@/pages/competition/CompetitionSearch'
import CompetitionDetail from '@/pages/competitiondetail/CompetitionDetail'
import CompetitionResult from '@pages/competition-result/CompetitionResult'
import Auth from '@pages/auth/Auth'
import Agreement from '@pages/agreement/Agreement'
import CompetitionManage from './pages/competitionmanage/CompetitionManage'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/competition/search" element={<CompetitionSearch />} />
          <Route path="/competition/detail/:competitionId" element={<CompetitionDetail />} />
          <Route path="/competition/manage/:competitionId" element={<CompetitionManage />} />
          <Route path="/competition-results" element={<CompetitionResult />} />
          <Route path="/sign-in" element={<Auth />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="*" element={<div>없는 페이지</div>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
