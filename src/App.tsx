import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import MainPage from './pages/mainPage/mainPage';
import NotFoundPage from './pages/notFondPage/notFoundPage';
import { Details } from './components/details/details';
import { ThemeProvider } from './context/themeContext';
import { useTheme } from './context/useTheme';

import './main-themes.scss';

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
  const { theme } = useTheme();
  return <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>{children}</div>;
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ErrorBoundary>
          <AppContent>
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route path="details/:bookUid" element={<Details />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppContent>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}
