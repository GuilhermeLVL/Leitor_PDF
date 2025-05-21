import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilos/global.css'
import App from './App.jsx'

// Seleciona o elemento HTML com o id 'root' onde a aplicação será renderizada
// Cria uma raiz do ReactDOM para renderizar o componente App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
