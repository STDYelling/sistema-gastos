/* función para formatear una cantidad a moneda */
const convertirCantidad = (cantidad) => {
    /* función de js para poder formatear una cantidad en moneda */
    return new Intl.NumberFormat(
        /* adentro solo se ponen los valores (como parámetros) */
        'en-US',
        {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
    ).format(cantidad);
}

export default convertirCantidad;