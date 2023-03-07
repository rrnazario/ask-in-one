import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './features/login/login.page';
import './index.css';
import { store } from './redux-ts';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './routes/error.page';
import { ProtectedRoute } from './routes/protected.route';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Saloon } from './features/saloon';
import { AuthProvider } from './providers/auth.provider';
import { KitchenPanel } from './features/kitchen/kitchen-panel.page';
import { Configurations } from './features/configs/config.page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute> <Saloon /> </ProtectedRoute>),
  },
  {
    path: "/kitchen",
    element: (<ProtectedRoute> <KitchenPanel /> </ProtectedRoute>),
  },
  {
    path: "/config",
    element: (<ProtectedRoute> <Configurations /> </ProtectedRoute>),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          pauseOnFocusLoss={false}
          hideProgressBar
        />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
