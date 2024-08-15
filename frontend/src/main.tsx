import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './error-page'
import Contact, { loader as conctactLoader, action as contactAction } from './routes/contact'
import EditContact, {action as editAction} from "./routes/edit";
import { action as destroyAction} from './routes/destroy';
import Index from './routes/index';

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: () => rootAction(queryClient),
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {index: true, element: <Index />},
          {
          path: 'contact/:contactId',
          element: <Contact />,
          loader: conctactLoader(queryClient),
          action: contactAction(queryClient),
          },
          {
            path: "contact/:contactId/edit",
            element: <EditContact />,
            loader: conctactLoader(queryClient),
            action: editAction(queryClient),
          },
          {
            path: "contact/:contactId/destroy",
            action: destroyAction(queryClient),
          },
        ]
      }
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
