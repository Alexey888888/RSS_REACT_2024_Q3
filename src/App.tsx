import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { MainPage } from './pages/mainPage/mainPage';

function App() {
  return (
    <>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </>
  );
}

export default App;
