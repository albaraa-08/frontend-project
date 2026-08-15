import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
  <BrowserRouter>
  <UserContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </UserContextProvider>
  </BrowserRouter>
  </Provider>,
);
