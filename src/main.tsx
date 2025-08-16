import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/router.tsx'
import { ThemeProvider } from "./Providers/theme.provider.tsx"
import { Provider as ReduxProvider } from 'react-redux'
import { Toaster } from './components/ui/sonner.tsx'
import { store } from './Redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ReduxProvider store={store}>
           <RouterProvider router={router} />
           <Toaster />
          </ReduxProvider>
    </ThemeProvider>
  </StrictMode>
)
