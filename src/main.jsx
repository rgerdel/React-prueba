import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Poke from './components/Poke.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Poke />
  </StrictMode>,
)
