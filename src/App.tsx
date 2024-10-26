import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelListPage from '@pages/HotelList'
import TestPage from '@pages/Test'
import HotelPage from '@pages/Hotel'
import MyPage from '@pages/My'
import SigninPage from '@pages/Signin'
import AuthGard from '@components/auth/AuthGuard'
import Navbar from '@shared/Navbar'

import PrivateRoute from '@components/auth/PrivateRoute'
import useLoadKakao from '@hooks/useLoadKakao'
import SettingsPage from '@pages/settings'
import LikePage from '@pages/settings/like'

function App() {
  useLoadKakao()
  return (
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
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGard>
    </BrowserRouter>
  )
}

export default App
