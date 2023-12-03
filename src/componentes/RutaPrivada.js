/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React from 'react';
import { useAuth } from '../contextos/Auth.context';
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({children}) => {

    const {usuario} = useAuth();

    if (usuario) {
        return children
    }else {
        return <Navigate replace to="/iniciar-sesion"></Navigate>
    }
}
 
export default RutaPrivada;