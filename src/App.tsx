import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelListPage from '@pages/HotelList'
import TestPage from '@pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
