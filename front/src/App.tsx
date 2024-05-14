import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/home/Home'
import Competition from '@/pages/competition/Competition'
import CompetitionSearch from '@/pages/competition/CompetitionSearch'
import CompetitionDetail from '@/pages/competitiondetail/CompetitionDetail'
import CompetitionResult from '@pages/competition-result/CompetitionResult'
import Auth from '@pages/auth/Auth'
import Signup from '@/pages/signup/Signup'
import CompetitionManage from '@pages/competitionmanage/CompetitionManage'
import CreateCompetition from '@pages/createcompetition/CreateCompetition'
import Dashboard from './pages/blockchain/dashboard'
import MyPage from './pages/mypage/MyPage'
import CreateTeam from './pages/createteam/CreateTeam'
import JoinTeam from './pages/jointeam/JoinTeam'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/competition/search" element={<CompetitionSearch />} />
            <Route path="/competition/detail/:competitionId" element={<CompetitionDetail />} />
            <Route path="/competition/manage/:competitionId" element={<CompetitionManage />} />
            <Route path="/competition-results" element={<CompetitionResult />} />
            <Route path="/competition-results/:code" element={<CompetitionResult />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/create-competition" element={<CreateCompetition />} />
            <Route path="/create-team" element={<CreateTeam />} />
            <Route path="/join/:code" element={<JoinTeam />} />
            <Route path="/blockchain/dashboard" element={<Dashboard />} />
            <Route path="*" element={<div>없는 페이지</div>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
