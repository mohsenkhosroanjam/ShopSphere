import { Outlet } from 'react-router-dom'
import Navigation from '../src/pages/Auth/Navigation.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from './pages/redux/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AnimatedCursor from 'react-animated-cursor'
import Canvas from './Utils/Cursor.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { Suspense } from 'react'
import Loader from './components/Loader.jsx'

// Create the QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <Canvas />
          <ToastContainer />
          <Navigation />
          <main className="py-3">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App;
