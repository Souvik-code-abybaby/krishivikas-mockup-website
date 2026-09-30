import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.jsx'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <BrowserRouter> <Provider store={store}>  <QueryClientProvider client={queryClient}> <App /></QueryClientProvider></Provider>
  </BrowserRouter>


)
