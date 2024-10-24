import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelListPage from '@pages/HotelList'
import TestPage from '@pages/Test'
import HotelPage from './pages/Hotel'

import useLoadKakao from '@hooks/useLoadKakao'

function App() {
  useLoadKakao()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
