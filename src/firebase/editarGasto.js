/* Llamando la referencia de la base de datos */
import { db } from "./firebaseConfig";
/* importando las funciones de coleccion y de addDoc que me permite agregar un documento */
import { collection, updateDoc, doc } from "firebase/firestore";

/* función que publica los elementos a la base de datos */
/* extraigo del objeto la categoria, la fecha y demás ... */
const editarGasto = async ({id, categoria, descripcion, cantidad, fecha}) => {

    /* almacenando el documento que se quiere editar o actualizar */
    const documento = (doc(db, 'gastos', id));
    /* si la base de datos no tiene esta colleción creada entonces la va a creara */
        return await updateDoc(documento, { //dentro de este objeto ponemos todas las propiedades que queremos agregar
            categoria: categoria,
            descripcion: descripcion,
            cantidad: Number(cantidad),
            fecha: fecha
        }); 
}

export default editarGasto;