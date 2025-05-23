import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './estilos/global.css'

// Importar pdfjs-dist e definir o caminho do worker
import { pdfjs } from 'react-pdf';

// Define o caminho para o arquivo worker do pdfjs-dist
// Certifique-se de que o caminho reflita a localização correta do worker na sua node_modules
// Para Vite, este caminho geralmente funciona para servir o arquivo diretamente da dependência
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// Seleciona o elemento HTML com o id 'root' onde a aplicação será renderizada
// Cria uma raiz do ReactDOM para renderizar o componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
