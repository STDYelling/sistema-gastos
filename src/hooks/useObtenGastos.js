/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

/* funciones de firebase */
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from 'firebase/firestore';
import {useState, useEffect} from 'react';
import { useAuth } from '../contextos/Auth.context';
/* importamos la base de datos */
import { db } from '../firebase/firebaseConfig';
/* importo mi useAuth */

const useObtenerGastos = () => {
	const {usuario} = useAuth();
	//console.log(usuario);
	const [gastos, cambiarGastos] = useState([]);
	/* almacena el último gasto */
	const [ultimoGasto, cambiarUltimoGasto] = useState(null);
	/* almacena si hay más valores por cargar */
	const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);


	/* función que cuando se llama cargue otros 10 artículos */
	const obtenerMasGastos = () => {
		const consulta = query(
			collection(db, 'gastos'),
			where('uidUsuario', '==', usuario.uid),
			orderBy('fecha', 'desc'),
			limit(10),
			/* empieza a regresar los gastos desde el último gasto o elemento */
			startAfter(ultimoGasto)
		);

		/* para juntar estos gastos a los que se cargaron antes de estos, se ejecuta cada que hay un cambio en los gastos  */
		onSnapshot(consulta, (snapshot) => {
			if(snapshot.docs.length > 0){
				/* obteniendo el último elemento que cargó en la listaGastos y almacenandolo en el estado ultimoGasto */
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);

				cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
					return {...gasto.data(), id: gasto.id}
				})))
			} else {
				cambiarHayMasPorCargar(false);
			}
		}, error => {console.log(error)});
	}

	useEffect(() => {
		const consulta = query(
			collection(db, 'gastos'),
			where('uidUsuario', '==', usuario.uid),
			orderBy('fecha', 'desc'),
			limit(10)
		);

		const unsuscribe = onSnapshot(consulta, (snapshot) => {
			if(snapshot.docs.length > 0){
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
				cambiarHayMasPorCargar(true);
			} else {
				cambiarHayMasPorCargar(false);
			}
			
			cambiarGastos(snapshot.docs.map((gasto) => {
				return {...gasto.data(), id: gasto.id}
			}));
		});

		return unsuscribe;
	}, [usuario]);

	return [gastos, obtenerMasGastos, hayMasPorCargar];
}
 
export default useObtenerGastos;