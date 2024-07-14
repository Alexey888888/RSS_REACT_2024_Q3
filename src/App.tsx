import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { MainPage } from './pages/mainPage/mainPage';
import { NotFoundPage } from './pages/notFondPage/notFoundPage';
import { Details } from './components/details/details';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="details/:bookUid" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
