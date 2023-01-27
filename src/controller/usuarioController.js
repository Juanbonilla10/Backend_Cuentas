const { getData, validacionUsuario } = require('../conexionFirebase')
const controlador = {};

controlador.listar = (req, res) => {

    //  CONSULTA A LA TABLA

    getData().then(resp => {
        console.log(resp)
        res.status(200).json({
            status: 200,
            message: "exito",
            response: resp
        })

    }).catch(err => {
        console.log(err)
        res.status(400).json({
            status: 200,
            message: "exito",
            response: err
        })
    })

}


controlador.guardar = (req, res) => {

    let tipo = req.body.tipo;

    let usuario = req.body.nombre;

    //guardar en la base de datos

    res.status(200).json({
        status: 200,
        message: "exito",
        response: usuario
    })

}

controlador.validarUsuario = (req, res) => {
    let usuarioProveniente = {};
    usuarioProveniente.username = req.body.username;
    usuarioProveniente.password = req.body.password;

    //console.log(req.body)
    validacionUsuario(usuarioProveniente.username, usuarioProveniente.password).then(resp => {
        if (resp == undefined) {
            console.log("Se presento un error en la ejecución de la consulta")
            res.status(500).json({
                status: 500,
                message: "exito",
                response: resp
            })
        } else {
            console.log(resp)
            res.status(200).json({
                status: 200,
                message: "algo salio mal",
                response: resp
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            status: 200,
            message: "exito",
            response: err
        })
    })

}

module.exports = controlador