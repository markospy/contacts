import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './error-page'
import { Contact, loader as conctactLoader } from './routes/contact'
import EditContact from "./routes/edit";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: () => rootLoader(queryClient),
    action: () => rootAction(queryClient),
    children: [
      {
      path: 'contact/:contactId',
      element: <Contact />,
      loader: conctactLoader(queryClient),
    },
    {
      path: "contact/:contactId/edit",
      element: <EditContact />,
      loader: conctactLoader(queryClient),
    },
  ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
