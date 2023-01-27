const { guardarRegistro,listarDesprendibles,eliminarRegistro,actualizarRegistro } = require('../conexionFirebase')
const controlador = {};

controlador.guardar = (req, res) => {

    let datosEj = {
        fechaPago: req.body.fecha,
        valorPago: req.body.pago,
        comentario: req.body.comentario,
        estado: "registrado"
    }

    guardarRegistro(datosEj).then(res => {
        console.log("Registrando formulario")
        res.status(201).json({
            status: 201,
            message: "exito",
            response: datosEj
        })
    }).catch(err=>{
        res.status(201).json({
            status: 201,
            message: "exito",
            response: err
        })
    })

}

controlador.listar = (req,res)=>{

    let dataF = listarDesprendibles()

    dataF.then(resp=>{
        console.log(`Listar desprendibles`)
        console.log(resp)
        res.status(200).json({
            status: 200,
            message: "exito",
            response: resp
        })
    }).catch(err=>{
        res.status(400).json({
            status: 400,
            message: "algo salio mal",
            response: err
        })
    })
}


controlador.eliminar = (req,res)=>{
    console.log("Entro por eliminacion",req.body.fechaPago)


    eliminarRegistro(req.body.fechaPago).then(resp=>{
        //console.log(res)
        res.status(200).json({
            status: 200,
            message: "exito",
            response: resp
        })
    }).catch(err=>{
        console.log(err)
        res.status(400).json({
            status: 400,
            message: "algo salio mal",
            response: err
        })
    })
}

controlador.actualizar = (req,res)=>{
    console.log("Entro por actualización",req.body.fechaPago)
    actualizarRegistro(req.body.fechaPago).then(resp=>{
        //console.log(res)
        res.status(200).json({
            status: 200,
            message: "exito",
            response: resp
        })
    }).catch(err=>{
        console.log(err)
        res.status(400).json({
            status: 400,
            message: "algo salio mal",
            response: err
        })
    })
}


module.exports = controlador