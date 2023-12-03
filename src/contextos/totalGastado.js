/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React, {useState, useEffect, useContext} from 'react'; 
/* llamo al hook que llama a los gastos del mes para poder calcular el total */
import useObtenerGastosMes from './../hooks/useObtenerGastosMes'


/* creando el contexto global */
const TotalGastadoContext = React.createContext();

/* para acceder de manera directa al contexto se crea un hook o función para ello */
const useTotalDelMes = () => {
    return useContext(TotalGastadoContext)
}

/* proovedor del contexto global */
const TotalGastadoProvider = ({children}) => {
    /* creando un estado para tener el total gastado */
    const [total, cambiarTotal] = useState(0);
    /* obtengo los gastos del mes */
    const gastos = useObtenerGastosMes();

    useEffect(() => {
        //console.log(gastos);
        let acumuladoMes = 0;  //variable para cumular la cantidad gastada en el mes
        /* le pongo el valor o la cantidad del gasto al acumulado por cada gasto */
        gastos.forEach((gasto) => {
            acumuladoMes = acumuladoMes + gasto.cantidad;
        })

        //console.log(acumulado);
        cambiarTotal(acumuladoMes);

        /* en las dependencias de useEffect se le pasa que se ejecute cada que gastos cambie */
    }, [gastos])

    return (
        /* en value se le pasa un objeto con las propiedades (los nombres de losestados que quiero hacer globales), y con el valor de cada 
           estado */
        <TotalGastadoContext.Provider value={{total: total}}>
            {children}
        </TotalGastadoContext.Provider>
    )
}

export {TotalGastadoProvider, useTotalDelMes}
