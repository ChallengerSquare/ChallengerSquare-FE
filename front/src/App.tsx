import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/home/Home'
import Competition from '@/pages/competition/Competition'
import CompetitionSearch from '@/pages/competition-search/CompetitionSearch'
import CompetitionDetail from '@/pages/competitiondetail/CompetitionDetail'
import CompetitionResult from '@pages/competition-result/CompetitionResult'
import Auth from '@pages/auth/Auth'
import Signup from '@/pages/signup/Signup'
import CompetitionManage from '@pages/competitionmanage/CompetitionManage'
import CreateCompetition from '@pages/createcompetition/CreateCompetition'
import ModifyPromotion from '@pages/modifycompetition/ModifyPromotion'
import ParticipateWindow from '@pages/competitiondetail/participatewindow/ParticipateWindow'
import NoticeWindow from '@pages/competitiondetail/competitiondetailnotice/noticewindow/NoticeWindow'
import QnaWindow from '@pages/competitiondetail/competitiondetailqna/qnawindow/QnaWindow'
import Certification from '@pages/certification/Certification'
import Dashboard from '@pages//blockchain/dashboard'
import CreateTeam from '@pages//createteam/CreateTeam'
import JoinTeam from '@pages//jointeam/JoinTeam'
import MyInfo from '@pages//mypage/myinfo/MyInfoPage'
import Alarm from '@pages//mypage/alarm/AlarmPage'
import CompetitionList from '@pages//mypage/competitionlist/CompetitionListPage'
import TeamList from '@pages//mypage/teamlist/TeamListPage'
import ResultList from '@pages//mypage/resultlist/ResultListPage'
import Setting from '@pages//mypage/setting/SettingPage'
import Error from '@pages//error/Error'
import Team from '@/pages/mypage/teamlist/TeamDetailPage'
import EventStreamManager from './components/EventStreamManager/EventStreamManager'
import PrivateRoute from './router/PrivateRoute'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
      staleTime: 1000 * 20,
      cacheTime: 1000 * 60 * 5,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <EventStreamManager />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/competition/search" element={<CompetitionSearch />} />
            <Route path="/competition/detail/:competitionId" element={<CompetitionDetail />} />
            <Route path="/competition-results" element={<CompetitionResult />} />
            <Route path="/competition-results/code/:code" element={<Certification />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/blockchain/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
            <Route element={<PrivateRoute />}>
              <Route path="/mypage/myinfo" element={<MyInfo />} />
              <Route path="/mypage/alarm" element={<Alarm />} />
              <Route path="/mypage/teamlist" element={<TeamList />} />
              <Route path="/mypage/teamlist/team/:teamId" element={<Team />} />
              <Route path="/mypage/competitionlist" element={<CompetitionList />} />
              <Route path="/mypage/resultlist" element={<ResultList />} />
              <Route path="/mypage/setting" element={<Setting />} />
              <Route path="/competition/participate/write/:competitionId" element={<ParticipateWindow />} />
              <Route path="/competition/notice/:competitionId" element={<NoticeWindow />} />
              <Route path="/competition/inquire/:competitionId" element={<QnaWindow />} />
              <Route path="/competition/manage/:competitionId" element={<CompetitionManage />} />
              <Route path="/competition/edit/:competitionId" element={<ModifyPromotion />} />
              <Route path="/create-competition" element={<CreateCompetition />} />
              <Route path="/create-team" element={<CreateTeam />} />
              <Route path="/join/:code" element={<JoinTeam />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
