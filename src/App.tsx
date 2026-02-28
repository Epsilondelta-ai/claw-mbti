import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/result/:type', element: <ResultPage /> },
  { path: '/result', element: <ResultPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
