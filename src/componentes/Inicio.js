/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from '../elementos/Header';
import Boton from '../elementos/Boton';
import BotonCerrarSesion from '../elementos/BotonCerrarSesio';
/* formulario de los gastos */
import FormularioGasto from './FormularioGasto';
/* importando la barra que muestra el total gastado */
import BarraTotal from './BarraTotal';

const Inicio = () => {

    return ( 
        <>
            <Helmet>
                <title>Agregar Gasto</title>
                
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>AGREGAR GASTO</Titulo>
                    <ContenedorBotones>
                        <Boton to={"/categorias"}><span></span>Categorías</Boton>
                        <Boton to={"/lista"}><span></span>Gasto</Boton>
                        <BotonCerrarSesion/>
                    </ContenedorBotones>
                </ContenedorHeader>
            </Header>

            <FormularioGasto/>
            <BarraTotal />
        </>
     );
}
 
export default Inicio;