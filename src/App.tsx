import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'
import { AxiosError } from 'axios';
import { PAGES } from './constants';
import { TokenService } from './service/token.service';

const App: React.FC = () => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      },
      queryCache: new QueryCache({
        onError: (error: Error | AxiosError) => {
          // @ts-ignore
          const status = error?.status
          if (status == 404) {
            window.location.href = PAGES.NOTFOUND
          }
          if (status == 403 && TokenService.getToken()) {
            window.location.href = PAGES.NOTFOUND
          }
          if (status == 403 || status === 401) {
            window.location.href = PAGES.AUTH
          }
        }
      }
      ),
      mutationCache: new MutationCache({
        onError: (error: Error) => {
          // @ts-ignore
          const status = error?.status
          if (status == 404) {
            window.location.href = PAGES.NOTFOUND
          }
          if (status == 403 && TokenService.getToken()) {
            window.location.href = PAGES.NOTFOUND
          }
          if (status == 403 || status === 401) {
            window.location.href = PAGES.AUTH
          }
        }
      })
    },)
  )
  return (
    <QueryClientProvider client={client}>
      <Toaster reverseOrder={false} />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}

export default App