/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../theme';
import {ReactComponent as IconoAbajo} from './../imagenes/down.svg'
/* importando el componente que regresa un icono dependiendo de la categoría */
import IconoCategoria from '../elementos/IconoCategorias';

const SelectCategorias = ({categoria, cambiarCategoria}) => {

    /* estado para mostrar las opciones o la lista de categorías */
    const [mostrarSelect, cambiarMostrarSelect] = useState(false);

    /* función handleClick para cambiar el valor de la categoria */
    const handleClick = (e) => {
        /* currentTarget para cuando el eventoo elemento está dentro de otro */
        //console.log(e.currentTarget.dataset.valor);
        cambiarCategoria(e.currentTarget.dataset.valor)
    }

    /* lista de las categorías representada cada una como un objeto */
    const categorias = [
        {id: 'comida', texto: 'Comida'},
        {id: 'cuentas y pagos', texto: 'Cuentas y pagos'},
        {id: 'hogar', texto: 'Hogar'},
        {id: 'transporte', texto: 'Transporte'},
        {id: 'ropa', texto: 'Ropa'},
        {id: 'salud e higiene', texto: 'Salud e Higiene'},
        {id: 'compras', texto: 'Compras'},
        {id: 'diversion', texto: 'Diversion'}
    ]
 
    return ( 
        <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
            <OpcionSeleccionada>
                {categoria} 
                <IconoAbajo/>
            </OpcionSeleccionada>

            {/* cuando el estado mostraSelect sea verdadero entonces muestra las opciones de las categorías */}
            {mostrarSelect &&
                <Opciones>
                    {categorias.map((categoria) => {
                        return <Opcion 
                                key={categoria.id}
                                /* para saber a qué opcioón se le dió click */
                                data-valor = {categoria.id}
                                onClick={handleClick}
                                >
                                    <IconoCategoria nombre={categoria.id}/>
                                    {categoria.texto}
                                </Opcion>
                    })}
                </Opciones>
            }
        </ContenedorSelect>
     );
}
 


/* usando styled componets para crear elementos html con estilos */
const ContenedorSelect = styled.div`
    background: ${theme.grisClaro};
    cursor: pointer;
    border: 3px solid orange;
    border-radius: 0.625rem; /* 10px */
    position: relative;
    height: 5rem; /* 80px */
    width: 40%;
    padding: 0px 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;

    &:hover {
        background: ${theme.grisClaro2};
    }

    @media(max-width: 30rem){ 
        font-size: 15px;
    }
`;

const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        width: 1.25rem; /* 20px */
        height: auto;
        margin-left: 1.25rem; /* 20px */
    }
`;

const Opciones = styled.div`
    background: ${theme.grisClaro};
    position: absolute;
    top: 5.62rem; /* 90px */
    left: 0;
    width: 100%;
    border-radius: 0.625rem; /* 10px */
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
`;

const Opcion = styled.div`
    padding: 1.25rem; /* 20px */
    display: flex;
    transition: .4s ease;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: #f7bb91 ;
    }
`;

export default SelectCategorias;
