/* importamos la base de datos */
import { db } from "./firebaseConfig";
/* importo la función doc para indicar cual es el documento a trabajar, y la segunda para borrar el documento */
import { doc, deleteDoc } from "firebase/firestore";

/* función para borrar un gasto */
const borrarGasto = async (id) => {
    /* se le pasa el documento de la base de datos dada, la colección y el id del documento */
    await deleteDoc(doc(db, 'gastos', id)); //como es código asincrono se usa await y en la cabecera async
}

export default borrarGasto;