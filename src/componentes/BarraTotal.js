/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
/* importando la función que convierte la cantidad en moneda */
import convertirCantidad from './../funciones/convertirAmoneda';
/* importo el hook que me da el contexto global del total gastado en el mes */
import { useTotalDelMes } from '../contextos/totalGastado';


const BarraTotal = () => {

    /* extrayendo el valor del total del hook */
    const {total} = useTotalDelMes();
    //console.log(total);

    return ( 
        <TotalGastado>
            <p>Este mes has gastado: {convertirCantidad(total)}</p>
        </TotalGastado>
     );
}
 
/* creando elementos con styled componets */
const TotalGastado = styled.div`
    background: ${theme.azulClaro};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid white;

    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

export default BarraTotal;