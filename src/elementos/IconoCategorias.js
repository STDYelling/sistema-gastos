/* Author: Juan Sebastian Peña Angarita 
   UAM CUAJIMALPA - CDMX  */

/* importando todos los iconos para la lista de categorías */
import React from 'react';

import {ReactComponent as IconoComida} from './../imagenes/cat_comida.svg';
import {ReactComponent as IconoCompras} from './../imagenes/cat_compras.svg';
import {ReactComponent as IconoCuentasYPagos} from './../imagenes/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoDiversion} from './../imagenes/cat_diversion.svg';
import {ReactComponent as IconoHogar} from './../imagenes/cat_hogar.svg';
import {ReactComponent as IconoRopa} from './../imagenes/cat_ropa.svg';
import {ReactComponent as IconoSaludEHigiene} from './../imagenes/cat_salud-e-higiene.svg';
import {ReactComponent as IconoTransporte} from './../imagenes/cat_transporte.svg';

/* regresa un Icono dependiendo del nombre que se le pase como propiedad nombre */
const IconoCategoria = ({nombre}) => {

        switch (nombre) {
            case 'comida':
                return <IconoComida/>
            case 'compras':
                return <IconoCompras/>
            case 'cuentas y pagos':
                return <IconoCuentasYPagos/>
            case 'transporte':
                return <IconoTransporte/>
            case 'ropa':
                return <IconoRopa/>
            case 'diversion':
                return <IconoDiversion/>
            case 'hogar':
                return <IconoHogar/>
            case 'salud e higiene':
                return <IconoSaludEHigiene/>
            default:
                break;     
        }

}/* cierre del componente */
 
export default IconoCategoria;