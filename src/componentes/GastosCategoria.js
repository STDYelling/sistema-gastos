/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React from 'react';
import { Header, Titulo } from '../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
/* barra que muestra el total gastado en el mes */
import BarraTotal from './BarraTotal';
/* importando el hook que me da los gastos del mes ordenados */
import useObtenerGastosMesCategoria from '../hooks/useObtenerGastoMesCategoria';
/* importando elementos con estilos para la lista */
import {ListaDeCategorias,ElementoListaCategorias,Categoria,Valor,} from './../elementos/ElementosDeLista';
/* importando el componente IconoCategoria que regresa un icono dependiendo de la propiedad(nombre de la categoría) que se le pase) */
import IconoCategoria from './../elementos/IconoCategorias'
/* importando la función para convertir el valor a moneda */
import convertirCantidad from '../funciones/convertirAmoneda';

const GastosCategoria = () => {

    const gastos = useObtenerGastosMesCategoria();

    return ( 
        <>
            <Helmet>
                <title>Gasto total por categoría</title>
            </Helmet>

            <Header>
                    <BtnRegresar/>
                    <Titulo>TOTAL POR CATEGORIA</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastos.map((gasto, index) => {
                    return(
                        <ElementoListaCategorias key={index}>
                            <Categoria>
                                <IconoCategoria nombre={gasto.categoria}/>
                                {gasto.categoria}
                                </Categoria>
                            <Valor>{convertirCantidad(gasto.cantidad)}</Valor>
                        </ElementoListaCategorias>
                    )
                })}
            </ListaDeCategorias>
            <BarraTotal />
        </>
     );
}
 
export default GastosCategoria;