import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer} from 'react-toastify';
import { QueryClient,QueryClientProvider,} from 'react-query'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './components/web/Context/User.jsx';
import { CartContextProvider } from './components/web/Context/FeatureCart.jsx';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <UserContextProvider>
  <CartContextProvider> 
  <QueryClientProvider client={queryClient} >
  <ToastContainer />
    <App />
  </QueryClientProvider>
  </CartContextProvider>

  </UserContextProvider>
  </>
)
