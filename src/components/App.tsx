import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsPage } from './ItemsPage';
import '../styles/App.css'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/items' element={<ItemsPage />} />
          <Route path='*' element={<ItemsPage />} />
        </Routes>
    </Router>
  )
}

export default App
