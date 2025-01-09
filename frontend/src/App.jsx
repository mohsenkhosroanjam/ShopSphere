import { Outlet } from 'react-router-dom'
import Navigation from '../src/pages/Auth/Navigation.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from './pages/redux/store.js'
function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <Navigation />
        <main className="py-3">
          <Outlet />
        </main></Provider>
    </>
  )
}

export default App
