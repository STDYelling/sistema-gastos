/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

//import React, { useContext } from 'react';
import { Header, Titulo } from '../elementos/Header';
import { Helmet } from 'react-helmet';
/* Boton de regresar */
import BtnRegresar from '../elementos/BtnRegresar';
/* importando el contexto global */
//import { AuthContext } from '../contextos/Auth.context';
//import { useAuth } from '../contextos/Auth.context';
/* barra que muestra el total gastado en el mes */
import BarraTotal from './BarraTotal';
/* importo la lista de mis gastos */
import useObtenGastos from '../hooks/useObtenGastos';
/* importo los elementos(con estilo) de lista de los gastos */
import {Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo} from '../elementos/ElementosDeLista';
/* importo los iconos (el componente al que le pasamos la categoria para quedevuelva un icono para cada cate */
import IconoCategoria from './../elementos/IconoCategorias';
/* importo la función que convierte a moneda */
import convertirCantidad from '../funciones/convertirAmoneda';
/* importando los iconos de editar y borrar como componentes */
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg'
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg'
/* importando el componente Link de reactRouter */
import { Link } from 'react-router-dom';
/* importo el elemento de boton */
import Boton from './../elementos/Boton'
/* importando la función format que permite dar formato a una fecha de js, y fromunixtime que permite
   transformar de unixTime a una fecha de js */
import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';
/* importando borrarGasto */
import borrarGasto from '../firebase/borrarGasto';


const ListaGastos = () => {

    //const {usuario} = useAuth();
    /* console.log(usuario); */

    /* extrae el valor de gastos */
    const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenGastos();
    //console.log(gastos);

    /* función para formatear una fecha */
    const formatearFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es});
    }

    /* función que comprueba si la fecha ya fue colocada anteriormente */
    const fechaEsIgual = (gastos, index, gasto) => {
        if (index !== 0) {        
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaAnterior = formatearFecha(gastos[index -1].fecha);
            //console.log(fechaActual, fechaAnterior);
            if(fechaActual === fechaAnterior) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    return ( 
        <>
            <Helmet>
                <title>Lista de gastos</title>
            </Helmet>

            <Header>
                    <BtnRegresar/>
                    <Titulo>LISTA DE GASTOS</Titulo>
            </Header>
            <Lista>
                {gastos.map((gasto, index) => {

                    return( 

                    <div key={gasto.id}>
                        {fechaEsIgual(gastos, index, gasto) &&                           
                            <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
                        <ElementoLista key={gasto.id}>
                            <Categoria>
                                <IconoCategoria nombre={gasto.categoria} />
                                {gasto.categoria}
                            </Categoria>

                            <Descripcion>
                                {gasto.descripcion}
                            </Descripcion>

                            <Valor>
                                {convertirCantidad(gasto.cantidad)}
                            </Valor>
                            {/* Botones para editar y borrar */}
                            <ContenedorBotones>
                                <BotonAccion title='editar' as={Link} to={`/editar/${gasto.id}`}>
                                    <IconoEditar/>
                                </BotonAccion>

                                <BotonAccion title='borrar'>
                                    <IconoBorrar onClick={() => borrarGasto(gasto.id)}/>
                                </BotonAccion>
                            </ContenedorBotones>

                        </ElementoLista>
                    </div>
                )})}

                {/* Bton para cargar más gastos(de los gastos de la base de datos) */}
                {/* si la variable extraida de useObtenerGastos hayMasPorCargar es verdadera entonces se carga el botón de cargar más  */}
                {hayMasPorCargar && 
                    <ContenedorBotonCentral>
                        {/* obtiene más gastos con la función obtenerMasGastos extraida de useObtenerGastos */}
                        <BotonCargarMas onClick={() => obtenerMasGastos()}>CARGAR MÁS GASTOS</BotonCargarMas>
                    </ContenedorBotonCentral>
                }

                {gastos.length === 0 && 
                    <ContenedorSubtitulo>
                        <Subtitulo>NO HAY GASTOS AGREGADOS</Subtitulo>
                        <Boton as={Link} to='/'>AGREGA UN GASTO</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotal/>
        </>
     );
}
 
export default ListaGastos;