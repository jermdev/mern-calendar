const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuarios');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async( req, res = response ) => {

    
    const { email, password } = req.body;
    
    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe cons ese correo'
            });
        }
    
        usuario = new Usuario( req.body );


        // Encriptar COntraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt );

    
        await usuario.save();

        // Gererar nuetro JWT
        const token = await generarJWT( usuario.id , usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }
}

const loginUsuarios = async( req, res = response ) => {
    
    const { email, password } = req.body; 

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Gererar nuetro JWT

        const token = await generarJWT( usuario.id , usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }

};

const recalidarToken = async( req, res = response ) => {

    const { uid, name } = req;

    const token = await generarJWT( uid , name );
    
    res.json({
        ok: true,
        uid, name,
        token
    })
};


module.exports = {
    crearUsuario,
    loginUsuarios,
    recalidarToken

}