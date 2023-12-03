/* Llamando la referencia de la base de datos */
import { db } from "./firebaseConfig";
/* importando las funciones de coleccion y de addDoc que me permite agregar un documento */
import { collection, addDoc } from "firebase/firestore";

/* función que publica los elementos a la base de datos */
/* extraigo del objeto la categoria, la fecha y demás ... */
const agregarGasto = ({categoria, descripcion, cantidad, fecha, uidUsuario}) => {
    /* si la base de datos no tiene esta colleción creada entonces la va a creara */
        return addDoc(collection(db, 'gastos'), { //dentro de este objeto ponemos todas las propiedades que queremos agregar
            categoria: categoria,
            descripcion: descripcion,
            cantidad: Number(cantidad),
            fecha: fecha,
            uidUsuario: uidUsuario
        }); 
}

export default agregarGasto;