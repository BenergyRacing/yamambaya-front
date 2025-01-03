import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Main.css'
import Home from './Home/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
