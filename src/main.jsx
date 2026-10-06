import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.jsx'
import "../src/components/language/i18n.js";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CompanyDataProvider } from './context/CompanyDataContext.jsx'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <BrowserRouter > <Provider store={store}>  <QueryClientProvider client={queryClient}> <CompanyDataProvider><App /></CompanyDataProvider></QueryClientProvider></Provider>
  </BrowserRouter>


)
// basename={import.meta.env.BASE_URL}