import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import Root, { loader as rootLoader } from './routes/root'
import ErrorPage from './error-page'
import Contact from './routes/contact'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => rootLoader(),
    children: [{
      path: 'contacts/:contactId',
      element: <Contact />,
    }],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
