/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import {useEffect, useState} from 'react';
/* importando los gastos del mes */
import useObtenerGastosMes from './useObtenerGastosMes';

const useObtenerGastosMesCategoria = () => {
    /* estado que guarda os gasto por categoria */
    const [gastosPorCategoria, cambiarGastosPorCategotia] = useState([]);
    /* extraigo los gastos del mes del hook useObtenerGastosMes */
    const gastos = useObtenerGastosMes();
    //console.log(gastos);

    useEffect(() => {
        /* se recorren los gasto y se verifica si tiene alguna de los categorias puestas en el reduce y se es así busca cual y se le suma la cantidad
       por categoría */
        /* regresa un objeto que va a contener la suma de cada categoría. Primero se le pasa una función callback y luego un valor(objeto en este caso)
        inicial */
        //el objeto resultante es la suma total por categoria
        const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => { //se ejecuta por cada elemento del gasto
            const categoriaActual = objetoActual.categoria;
            const cantidadCategoriaActual = objetoActual.cantidad;
            /* al objeto que va a resultar con la suma todo por categoría se le va sumando cada gasto por categoría */
            objetoResultante[categoriaActual] += cantidadCategoriaActual;

            return objetoResultante;
        }, { 
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0,
        })

        //console.log(sumaDeGastos);
        /* tomo las propiedades del objeto y lo transformo a elementos de un arreglo */
        //console.log(Object.keys(sumaDeGastos)); 
        /* por cada elemento de este arreglo devuelve un objeto con la categoría y la cantidad de esta */
        cambiarGastosPorCategotia(Object.keys(sumaDeGastos).map((elemento) => {
            return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
        }))
    },[gastos, cambiarGastosPorCategotia])

    

    return gastosPorCategoria;
}
 
export default useObtenerGastosMesCategoria;