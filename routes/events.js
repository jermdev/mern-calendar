const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();
const { check } = require('express-validator');
// Todas tienen que pasar por la validacion del JWT
// Obtener Eveventos 

router.use( validarJWT );

router.get( '/', getEvento );

// Crear un nuevo evevento 
router.post( 
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento );

// Actualisar evento   
router.put( '/:id', actualizarEvento );

// Borrar evento   
router.delete( '/:id', eliminarEvento );

module.exports = router


