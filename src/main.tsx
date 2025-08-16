import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/router.tsx'
import { ThemeProvider } from "./Providers/theme.provider.tsx"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './Redux/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ReduxProvider store={store}>
           <RouterProvider router={router} />
          </ReduxProvider>
    </ThemeProvider>
  </StrictMode>
)
