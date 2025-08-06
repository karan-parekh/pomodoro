import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'

import Navbar from './components/Navbar'
import App from './components/App'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='main'>
      <Navbar />
      <App />
      <Footer />
    </div>
  </StrictMode>,
)
