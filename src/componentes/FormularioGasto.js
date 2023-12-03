/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React, {useState, useEffect} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from '../elementos/ElementosFormulario';
import Boton from '../elementos/Boton';
/* importando icono como un componente de react */
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg';
/* importando el SelectCategorias para mostrar el menu o lista de categorias */
import SelectCategorias from './SelectCategorias';
/* importando el DatePicker */
import DatePicker from './DatePicker';
/* importando la función de agregar gasto */
import agregarGasto from '../firebase/agregarGasto';
/* para dar un formato con segundos de la fecha */
import getUnixTime from 'date-fns/getUnixTime'
import fromUnixTime  from 'date-fns/fromUnixTime';
/* importando la el hook que me regresa autenticación del usuario */
import { useAuth } from '../contextos/Auth.context';
/* importando el componente de alerta para desplegar estas al hacer submit */
import Alerta from './../elementos/Alerta'
import { useNavigate } from 'react-router-dom';
/* importando la función para editar un gasto */
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {

    /* useState para administrar los valores de los input */
    const [descripcion, cambiarDescripcion] = useState('');
    const [valor, cambiarValor] = useState('');

    /* estado que guarda la opción seleccionada */
    const [categoria, cambiarCategoria] = useState('hogar');

    /* estado para la fecha(por default es la fecha actual), new Date crea una fecha con la información actual */
    const [fecha, cambiarFecha] = useState(new Date());

    /* extrayendo el usuario de useAuth. Para acceder al id del usuario se le pone uid (universal id) */
    const {usuario} = useAuth();

    const navigate = useNavigate();

    /* estado para mostrar la alerta */
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    /* estado para la alerta, el tipo de alerta y el mensaje */
    const [alerta, cambiarAlerta] = useState({});

    /* función handleChange para los input */
    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            cambiarDescripcion(e.target.value);
        }
        else if (e.target.name === 'valor') {
            /* replace es para una expresión regular. Para que el usuario solo pueda ingresar números en el valor 
               Todo lo que no sea esa expresión regular lo convierte en una cadena vacía */
            cambiarValor(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }/* cierre de la función handleChange */

    /* usando useEffect que se ejecuta cuando la página cambia una vez o cuando las dependencias cambian */
    useEffect(() => {
        /* se comprueba si hay algún gasto */
        if(gasto) {
            /* comprobar si el gasto pertenece al usuario actual */
            if(gasto.data().uidUsuario === usuario.uid) {
                /* se establece el estado con los valores del gasto */
                cambiarCategoria(gasto.data().categoria);
                cambiarDescripcion(gasto.data().descripcion);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarValor(gasto.data().cantidad); 
            }else {
                navigate('/lista');
            }
        }

    }, [gasto, navigate, usuario]);

    /* función handleSubmit del formulario */
    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(valor).toFixed(2); //para agregarle decimales a la cantidad
        //console.log(usuario.uid);
        //console.log(cantidad);

        /* hay que comprobar si hay una descripción y un valor o cantidad */
        if (descripcion !== '' && valor !== '') {
            /* accediendo a los valores de mis estado */
            // console.log(descripcion);
            // console.log(valor);
            // console.log(categoria);
            // console.log(fecha);
            /* a la función de agregarGasto le paso un objeto con: */

            if (cantidad) {     
                /* si al formulario se le pasó la propiedades gasto entonces es para editar el gasto */
                if(gasto) {
                    //console.log(gasto.id);
                    /* llamo a la función que actualiza el gasto(documento) en la base de datos */
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        descripcion: descripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => {
                        navigate('/lista');
                    })

                } else {
                    agregarGasto({
                        categoria: categoria,
                        descripcion: descripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    })
                    /* para acceder a la promesa que regresa la base de datos y ejecuatar una función cuando todos los valores son correctos */
                    .then(() => {
                        /* reinicio todos los valores */
                        cambiarCategoria('hogar');
                        cambiarDescripcion('');
                        cambiarValor('');
                        cambiarFecha(new Date())
                        /* mando la alerta cuando ya se pudo agregar correctamente el gasto */
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo: 'exito', mensaje:'Gasto Agregado'})
                    })
                    .catch(() => {
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo: 'error', mensaje:'no se pudo agregar el gasto'})
                    }) 
                }
                
            }else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje:'Cantidad inválida'})
            }

        }else {
            //console.log('Agrega todos los valores');
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Rellena Todos los campos'});
        }

    }

    return ( 
        <Formulario onSubmit={handleSubmit}>

            <ContenedorFiltros>
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
                {/* se le pasa el estado de categoria y cambiarCategoria para que la cambie en la opcion seleccionada en
                el componente SelectCategorias */}
                <SelectCategorias categoria={categoria} cambiarCategoria={cambiarCategoria}/>
            </ContenedorFiltros>

            <div>
                <Input 
                    type='text' 
                    name='descripcion' 
                    id='descripcion' 
                    placeholder='Describe el gasto'
                    value={descripcion}
                    onChange={handleChange}
                    >
                        
                </Input>

                <InputGrande 
                    type='text' 
                    name='valor' 
                    id='valor' 
                    placeholder='$0.00'
                    value={valor}
                    onChange={handleChange}
                    >    
                </InputGrande>
                    
            </div>  

            <ContenedorBoton>
                <Boton as='button' primario conIcono type='submit'>
                    <span></span>
                    {gasto ? 'EDITAR' : 'AGREGAR'} 
                    <IconoPlus/>
                </Boton>
            </ContenedorBoton>

            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
     );
}
 
export default FormularioGasto;

