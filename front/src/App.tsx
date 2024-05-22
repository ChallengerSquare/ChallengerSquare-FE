import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EventStreamManager from '@components/EventStreamManager/EventStreamManager'
import Home from '@pages/home/Home'
import CompetitionMain from '@/pages/competitionmain/CompetitionMain'
import CompetitionSearch from '@/pages/competitionsearch/CompetitionSearch'
import CompetitionDetails from '@pages/competitiondetails/CompetitionDetails'
import BlockchainSearch from '@pages/blockchainsearch/BlockchainSearch'
import Certification from '@pages/blockchainsearch/certification/Certification'
import Auth from '@pages/auth/Auth'
import Signup from '@pages/signup/Signup'
import Dashboard from '@pages/dashboard/Dashboard'
import Error from '@pages/error/Error'
import Setting from '@pages/mypage/setting/Setting'
import ParticipateWindow from '@pages/competitiondetails/Info/participatewindow/ParticipateWindow.page'
import NoticeWindow from '@pages/competitiondetails/Notice/noticewindow/NoticeWindow.page'
import QnaWindow from '@pages/competitiondetails/QnA/qnawindow/QnaWindow.page'
import CompetitionManangement from '@/pages/competitionmanagement/CompetitionManangement'
import CompetitionEdit from '@pages/competitionedit/CompetitionEdit'
import CompetitionCreation from '@pages/competitioncreation/CompetitionCreation'
import TeamCreation from '@pages/teamcreation/TeamCreation'
import TeamRegistration from '@/pages/teamregisteration/TeamRegistration'
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
            <Route path="/competition" element={<CompetitionMain />} />
            <Route path="/competition/search" element={<CompetitionSearch />} />
            <Route path="/competition/detail/:competitionId" element={<CompetitionDetails />} />
            <Route path="/competition-results" element={<BlockchainSearch />} />
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
              <Route path="/competition/manage/:competitionId" element={<CompetitionManangement />} />
              <Route path="/competition/edit/:competitionId" element={<CompetitionEdit />} />
              <Route path="/create-competition" element={<CompetitionCreation />} />
              <Route path="/create-team" element={<TeamCreation />} />
              <Route path="/join/:code" element={<TeamRegistration />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
