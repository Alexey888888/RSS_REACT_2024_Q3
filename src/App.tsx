import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { MainPage } from './pages/mainPage/mainPage';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<MainPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
