import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'modern-normalize/modern-normalize.css';
import './styles/main.scss';
// import context from './context/authContext';
import AuthProvider from './context/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <context.Provider value={{ a: 5 }}> */}
      <AuthProvider>
        <App />
      </AuthProvider>
      {/* </context.Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
