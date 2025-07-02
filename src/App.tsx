import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IPProvider } from './context/IPContext'
import HomePage from './pages/HomePage'

const App = () => {
  return (
<BrowserRouter basename="/ip-address-tracker">
      <IPProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </IPProvider>
    </BrowserRouter>
  )
}

export default App
