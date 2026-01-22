import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router.jsx'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppRouter />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#07F49E',
                color: '#000',
              },
            },
            error: {
              style: {
                background: '#FF6B6B',
                color: '#fff',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App