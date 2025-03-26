import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Slice from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Slice />
  </StrictMode>,
)
