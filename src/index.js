/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
/* importando Helmet */
import { Helmet } from 'react-helmet';
import favicon from "./imagenes/logo.png"
/* importando el contexto global y el proveedor del contexto global */
import { AuthContext, AuthProvider } from './contextos/Auth.context';
/* importando el contexto global que da el total gastado en el mes */
import { TotalGastadoProvider } from './contextos/totalGastado';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Helmet>
    <link rel='shortcut icon' href={favicon} type='image/x-icon'/>
    <title>Lista de tareas</title>
    <meta name="author" content="Juan Sebastian Peña Angarita" />
    <meta charset="UTF-8"></meta>
  </Helmet>

  <AuthProvider>
    <TotalGastadoProvider>
      <BrowserRouter>
        {/* <React.StrictMode> */}
          <App/>
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </TotalGastadoProvider>
  </AuthProvider>
  </>
);


