import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsPage } from './ItemsPage';

function App() {

  return (
    <Router>
        <Routes>
          <Route path='*' element={<ItemsPage />} />
        </Routes>
    </Router>
  )
}

export default App
