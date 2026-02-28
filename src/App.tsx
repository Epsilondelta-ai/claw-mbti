import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import RedirectToLocale from './components/RedirectToLocale';

const router = createBrowserRouter([
  { path: '/', element: <RedirectToLocale /> },
  { path: '/result/:type', element: <RedirectToLocale /> },
  { path: '/result', element: <RedirectToLocale /> },
  { path: '/:lang', element: <HomePage /> },
  { path: '/:lang/result/:type', element: <ResultPage /> },
  { path: '/:lang/result', element: <ResultPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
