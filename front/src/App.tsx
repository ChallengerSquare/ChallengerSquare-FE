import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EventStreamManager from '@components/EventStreamManager/EventStreamManager'
import Home from '@pages/home/Home'
import ViewCompetition from '@pages/view-competition/ViewCompetition'
import SearchCompetition from '@pages/search-competition/SearchCompetition'
import DetailCompetition from '@pages/detail-competition/DetailCompetition'
import SearchBlockChain from '@pages/search-blockchain/SearchBlockchain'
import Certification from '@pages/search-blockchain/certification/Certification'
import Auth from '@pages/auth/Auth'
import Signup from '@pages/signup/Signup'
import Dashboard from '@pages/dashboard/Dashboard'
import Error from '@pages/error/Error'
import Setting from '@pages/mypage/setting/Setting'
import ParticipateWindow from '@pages/detail-competition/Info/participatewindow/ParticipateWindow.page'
import NoticeWindow from '@pages/detail-competition/Notice/noticewindow/NoticeWindow.page'
import QnaWindow from '@pages/detail-competition/QnA/qnawindow/QnaWindow.page'
import ManageCompetition from '@pages/manage-competition/ManageCompetition'
import ModifyPromotion from '@pages/modify-competition/ModifyPromotion'
import CreateCompetition from '@pages/create-competition/CreateCompetition'
import CreateTeam from '@pages/create-team/CreateTeam'
import JoinTeam from '@pages/join-team/JoinTeam'
import PrivateRoute from '@router/PrivateRoute'
import MyInfoPage from '@pages/mypage/myinfo/MyInfo.page'
import AlarmPage from '@pages/mypage/alarm/Alarm.page'
import TeamListPage from '@pages/mypage/teams/list/TeamList.page'
import TeamDetailPage from '@pages/mypage/teams/detail/TeamDetail.page'
import ParticipantListPage from '@pages/mypage/participant-list/ParticipantList.page'
import ResultListPage from '@pages/mypage/result-list/ResultList.page'

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
            <Route path="/competition" element={<ViewCompetition />} />
            <Route path="/competition/search" element={<SearchCompetition />} />
            <Route path="/competition/detail/:competitionId" element={<DetailCompetition />} />
            <Route path="/competition-results" element={<SearchBlockChain />} />
            <Route path="/competition-results/code/:code" element={<Certification />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/blockchain/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
            <Route element={<PrivateRoute />}>
              <Route path="/mypage/myinfo" element={<MyInfoPage />} />
              <Route path="/mypage/alarm" element={<AlarmPage />} />
              <Route path="/mypage/teamlist" element={<TeamListPage />} />
              <Route path="/mypage/teamlist/team/:teamId" element={<TeamDetailPage />} />
              <Route path="/mypage/competitionlist" element={<ParticipantListPage />} />
              <Route path="/mypage/resultlist" element={<ResultListPage />} />
              <Route path="/mypage/setting" element={<Setting />} />
              <Route path="/competition/participate/write/:competitionId" element={<ParticipateWindow />} />
              <Route path="/competition/notice/:competitionId" element={<NoticeWindow />} />
              <Route path="/competition/inquire/:competitionId" element={<QnaWindow />} />
              <Route path="/competition/manage/:competitionId" element={<ManageCompetition />} />
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
