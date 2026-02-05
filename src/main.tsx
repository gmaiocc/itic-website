// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext' // <--- Importa isto

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>  {/* <--- Adiciona aqui */}
      <App />
    </AuthProvider> {/* <--- Fecha aqui */}
  </React.StrictMode>,
)