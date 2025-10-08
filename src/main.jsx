import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '../context/storeContent.jsx'
import { AuthProvider } from "../context/AuthContent.jsx";


createRoot(document.getElementById('root')).render(
    <StoreProvider>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StoreProvider>
)
