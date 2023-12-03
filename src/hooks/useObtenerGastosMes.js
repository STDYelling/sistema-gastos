/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import {useState, useEffect} from "react";
import { db } from "../firebase/firebaseConfig";
/* importando mi usuario activo */
import { useAuth } from '../contextos/Auth.context';
import {startOfMonth, endOfMonth, getUnixTime} from 'date-fns';
import { collection, where, onSnapshot, query, orderBy } from "firebase/firestore";

const useObtenerGastosMes = () => {

    const [gastos, establecerGastos] = useState([]);
    const {usuario} = useAuth();

    useEffect(() => {
        /* almacenando el inicio del mes y el final del mes y trasnformandolo en formatoUnix */
        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const finDeMes = getUnixTime(endOfMonth(new Date()));
        // console.log(inicioDeMes);
        // console.log(finDeMes);
        if (usuario) {        
            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioDeMes),
                where('fecha', '<=', finDeMes),
                where('uidUsuario', '==', usuario.uid)
            );

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                establecerGastos(snapshot.docs.map((documento) => {
                    return {...documento.data(), id: usuario.uid}
                }))
            }, (error) => {console.log(error)});
            return unsuscribe;
        }
        
    }, [usuario])

    return gastos;
}
 
export default useObtenerGastosMes;