import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useLoadKakao from './hooks/useLoadKakao'
import Navbar from '@shared/Navbar'
import AuthGard from '@components/auth/AuthGuard'

const HotelListPage = lazy(() => import('@pages/HotelList'))
const TestPage = lazy(() => import('@pages/Test'))
const HotelPage = lazy(() => import('@pages/Hotel'))
const MyPage = lazy(() => import('@pages/My'))
const SigninPage = lazy(() => import('@pages/Signin'))
const PrivateRoute = lazy(() => import('@components/auth/PrivateRoute'))
const SettingsPage = lazy(() => import('@pages/settings'))
const LikePage = lazy(() => import('@pages/settings/like'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('./pages/ReservationDone'))
const ReservationListPage = lazy(() => import('./pages/ReservationList'))

function App() {
  useLoadKakao()
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <AuthGard>
          <Navbar />
          <Routes>
            <Route path="/" element={<HotelListPage />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings/like"
              element={
                <PrivateRoute>
                  <LikePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <PrivateRoute>
                  <SchedulePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation"
              element={
                <PrivateRoute>
                  <ReservationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/done"
              element={
                <PrivateRoute>
                  <ReservationDonePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/list"
              element={
                <PrivateRoute>
                  <ReservationListPage />
                </PrivateRoute>
              }
            />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </AuthGard>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
