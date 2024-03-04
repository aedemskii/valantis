import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { ItemsPage } from './ItemsPage';
import '../styles/App.css'

function App() {

  return (
    <Router>
        <Routes>
          <Route path='/items' element={<ItemsPage />} />
          <Route path='*' element={<Home />} />
        </Routes>
    </Router>
  )
}

export default App
