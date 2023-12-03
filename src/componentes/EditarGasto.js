/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React from 'react';
import { Header, Titulo } from '../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
/* barra que muestra el total gastado en el mes */
import BarraTotal from './BarraTotal';
/* importando el formulario para agregar un gasto */
import FormularioGasto from './FormularioGasto';
/* importando useParams para poder obtener el id de la barra de direcciones */
import { useParams } from 'react-router-dom';
/* importando el hook para obtener el gasto por el id */
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {
    /* usando useParams extrayendo el id */
    const {id} = useParams();
    //console.log(id);
    /* extraigo el gasto del hook */
    const[gasto] = useObtenerGasto(id);

    return ( 
        <>
            <Helmet>
                <title>Editar gasto</title>
            </Helmet>

            <Header>
                    <Titulo>EDITAR GASTO</Titulo>
                    <BtnRegresar ruta='/lista'/>
            </Header>
            <FormularioGasto gasto={gasto}/>
            <BarraTotal />
        </>
     );
}
 
export default EditarGasto;