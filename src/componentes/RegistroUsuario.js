/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader} from '../elementos/Header';
import Boton from '../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosFormulario';
import {ReactComponent as Login} from './../imagenes/unDraw.svg'
import styled from 'styled-components';
/* importando auth que es la autenticación de firebase */
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
/* useNavigate para volver a la ruta anterior o a la ruta específicada */
import { useNavigate} from "react-router-dom";
import Alerta from '../elementos/Alerta';

const RegistroUsuario = () => {

    const navigate = useNavigate();

    const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');
	const [password2, establecerPassword2] = useState('');

    /* por defecto la alerta va a estar oculta */
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                establecerCorreo(e.target.value);
                break;
            case 'password':
                establecerPassword(e.target.value);
                break;
            case 'password2':
                establecerPassword2(e.target.value);
                break;
            default:
                break;
        } 
    }

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
        if(correo === '' || password === '' || password2 === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: "Rellena todos los datos" });
            return;
        }
        if (password !== password2) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: "Las contraseñas no coinciden" });
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, correo, password);
                console.log("Registro exitoso :)");
                navigate('/');
        } catch (error) {
            cambiarEstadoAlerta(true);
            console.log(error);
            let mensaje;
            /* errores de firebase */
            switch (error.code) {
                case 'auth/invalid-password':
                    mensaje = "La constraseña debe ser de al menos 6 caracteres";
                    break;
                case 'auth/email-already-in-use':
                     mensaje = "Ya existe una cuenta con este correo";
                    break;
                case 'auth/invalid-email':
                    mensaje = "El correo no es válido";
                    break;
                default:
                    mensaje = "No fue posible crear la cuenta";
                    break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje });
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>CREAR CUENTA</Titulo>
                    <div>
                        <Boton to={"/iniciar-sesion"}>INICIAR SESIÓN</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario action='' onSubmit={handleSubmit}>
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
                <Input 
					type="password"
					name="password2"
					placeholder="Repetir la contraseña"
					value={password2}
					onChange={handleChange}
				/>
                <ContenedorBoton>
                    <Boton primario as="button" type='submit'>CREAR CUENTA</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta}/>
        </>
     );
}
 
const Svg = styled(Login)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

export default RegistroUsuario;