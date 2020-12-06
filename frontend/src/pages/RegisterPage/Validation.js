
const validate = (values) => {
    const errors = {};
    var alfaRGEX = /^[a-zA-Z]*$/;
    var alfaOtrosRGEX = /^[a-zA-Z ]*$/;
    var numRGEX = /^[a-zA-Z0-9]*$/;

    if (alfaRGEX.test(values.primer_apellido) === false || !values.primer_apellido) {
        errors.primer_apellido = "No se permite números,caracteres especiales,acentos ni Ñ";
    }

    if (alfaRGEX.test(values.segundo_apellido) === false || !values.segundo_apellido) {
        errors.segundo_apellido = "No se permite números,caracteres especiales,acentos ni Ñ";
    }

    if (alfaRGEX.test(values.primer_nombre) === false || !values.primer_nombre) {
        errors.primer_nombre = "No se permite números,caracteres especiales,acentos ni Ñ";
    }

    if (alfaOtrosRGEX.test(values.otros_nombres) === false ) {
        errors.otros_nombres = "No se permite números,caracteres especiales,acentos ni Ñ";
    }
    
    if (numRGEX.test(values.numero_identificacion) === false || !values.numero_identificacion) {
        errors.numero_identificacion = "Solo valores alfanuméricos";
    }

    return errors;
}

export default validate;



