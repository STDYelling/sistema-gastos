/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader} from '../elementos/Header';
import Boton from '../elementos/Boton';
/* importando las estructuras de un formulario creadas con styled components */
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosFormulario';
import {ReactComponent as Login} from './../imagenes/unDraw2.svg'
/* styled components */
import styled from 'styled-components';
/* useNavigate para volver a la ruta anterior o a la ruta específicada */
import { useNavigate } from 'react-router-dom';
/* importando auth que es la autenticación de firebase */
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
/* importando la estructura de una alerta que recibe varias propiedades */
import Alerta from '../elementos/Alerta';

const InicioSesion = () => {

    
    const navigate = useNavigate();

    const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');

    /* por defecto la alerta va a estar oculta */
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            establecerCorreo(e.target.value);
        }
        else if(e.target.name === 'password'){
            establecerPassword(e.target.value);
        }
    } /* cierra handleChange */

    /* handleSubmit */
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});
        //console.log(correo, password, password2);

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        //console.log(expresionRegular.test(correo));
        if(!expresionRegular.test(correo)){
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: "Correo inválido" });
            return;
        }
        if(correo === '' || password === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: "Rellena todos los datos" });
            return;
        }

        try {
            /* función de firebase para validar el correo y la contraseña */
            await signInWithEmailAndPassword(auth, correo, password);
                console.log("Registro exitoso :)");
                navigate('/');
        } catch (error) {
            cambiarEstadoAlerta(true);
            console.log(error);
            let mensaje;
            /* errores de firebase */
            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = "La constraseña es incorrecta";
                    break;
                case 'auth/user-not-found':
                     mensaje = "No se encontró cuenta con este correo";
                    break;
                default:
                    mensaje = "No fue posible iniciar sesión";
                    break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje });
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>INICIAR SESIÓN</Titulo>
                    <div>
                        <Boton to={"/crear-cuenta"}>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input
                    type='email'
                    name='email'
                    placeholder='Correo Electrónico'
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton primario as="button" type='submit'>INICIAR SESIÓN</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta}/>
        </>
     );
}

const Svg = styled(Login)`
    width: 45%;
    max-height: 12.5rem; /* 100px */
    margin: 0 auto;
    margin-bottom: 1.25rem; /* 20px */
`;
export default InicioSesion;