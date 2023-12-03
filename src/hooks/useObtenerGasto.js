/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React, {useEffect, useState} from "react";
/* importando la base de datos */
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
/* importando navigate */
import { useNavigate } from "react-router-dom";

const useObtenerGasto = (id) => {
    /* estado para guardar el gasto */
    const [gasto, cambiarGasto] = useState('');

    const navigate = useNavigate();

    /* conectando a la base de datos */
    useEffect(() => {
        const obtenerGasto = async () => {
            const documento = await getDoc(doc(db, 'gastos', id));

            if(documento.exists) {
                cambiarGasto(documento)
            } else {
                navigate('/lista');
            }
        }

        obtenerGasto();

    }, [])

    return [gasto];
}
 
export default useObtenerGasto;