const { informesEstadisticos} = require('../conexionFirebase')
const controlador = {};

controlador.informesEstadisticos = (req,res)=>{
    console.log("Entro por informes estadisticos")
    informesEstadisticos().then(resp=>{
        console.log(resp)
        res.status(200).json({
            status: 200,
            message: "exitoso",
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