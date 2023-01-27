const morgan = require('morgan');
const express = require('express');
const { db } = require('./firebase');
const app = express();

app.use(morgan('dev'))

async function getData() {
    let probandoDatos;

    await db.collection('usuarios').get().then(res => {
        let data = []
        res.forEach(doc => {
            //console.log(doc.data());
            //console.log(doc.id);
            data.push(doc.data())
        })
        //console.log(data)
        probandoDatos = data
    }).catch(err => {
        console.log(`Error al obtener los datos desde firebase ${err}`)
        return false
    })

    //console.log(`DAtos desde `, probandoDatos)

    return probandoDatos
}

async function validacionUsuario(username = "", password = "") {

    let datosUsuarioValidado;

    // Create a reference to the cities collection
    const citiesRef = db.collection('usuarios');

    let respuesta = citiesRef.where('user', '==', username).where('password', '==', password).get();

    await respuesta.then(res => {

        if (res._size >= 1) {
            res.forEach(doc => {
                if (doc.id == "") {
                    console.log("No hay datos sobre el usuario")
                    datosUsuarioValidado = "No hay datos sobre el usuario"
                }
                //console.log(doc.data())
                datosUsuarioValidado = doc.data()
                //console.log(doc.id)

            })
        }
        else {
            console.log("No hay datos sobre el usuario")
            return false
        }


        //console.log(datosUsuarioValidado)
        //return datosUsuarioValidado;

        //console.log(res)
    }).catch(err => {
        console.log(err)
        return false;
    })

    return datosUsuarioValidado

}

async function guardarRegistro(desprendible) {

    await db.collection('desprendiblePago').add(desprendible).then(res => {
        console.log("Ok", res)
        return res
    }).catch(err => {
        console.log("Error ", err)
        return err
    })
}

async function listarDesprendibles() {
    return await db.collection('desprendiblePago').orderBy('fechaPago').get().then(res => {
        let arregloDesprendibles = []
        res.forEach(doc => {
            arregloDesprendibles.push(doc.data())
            //console.log(doc.data())
        })
        if (arregloDesprendibles == "") {
            //console.log("Datos vacios" ,arregloDesprendibles )
            return false
        } else {
            //console.log("Datos",arregloDesprendibles)
            return arregloDesprendibles
        }
        //console.log("Ok lista desprendibles",arregloDesprendibles)
    }).catch(err => {
        console.log(`Error al realizar el listado de desprendibles ${err}`)
        return err
    })

}

async function eliminarRegistro(data = "2023-01-17") {

    const citiesRef = db.collection('desprendiblePago');

    let respuesta = citiesRef.where('fechaPago', '==', data).get();

    return await respuesta.then(res => {
        res.forEach(element => {
            citiesRef.doc(element.id).delete().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });
        })
        return true
    }).catch(err => {
        console.log(err)
        return false
    })


}

async function actualizarRegistro(fechaUpdate) {

    const citiesRef = db.collection('desprendiblePago');

    let respuesta = citiesRef.where('fechaPago', '==', fechaUpdate).get();

    return await respuesta.then(res => {
        res.forEach(element => {
            citiesRef.doc(element.id).update({ estado: "pagado" }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
        return true
    }).catch(err => {
        console.log(err)
        return false
    })

}

async function informesEstadisticos() {
    const citiesRef = db.collection('desprendiblePago');
    const fecha = new Date();
    let fechaDia = (fecha.getMonth() + 1).toString()
    let fechaHoy ;
    let anoMes = `${fecha.getFullYear()}-0${fecha.getMonth() + 1}-${'01'}` ;
    console.log(anoMes)
    if(fechaDia.length == "1"){
        fechaHoy = `${fecha.getFullYear()}-0${fecha.getMonth() + 1}-${fecha.getDate()}`
    }else{
        fechaHoy = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
    }

    console.log(fechaHoy)


    let informeDeuda = citiesRef.where('estado', '==', 'registrado').get();
    let informeMontoMensual = citiesRef.where('estado', '==', 'pagado').where('fechaPago', '>=', anoMes ).where('fechaPago','<=',fechaHoy).get();
    
    let valorDeuda = 0
    let valorMontoMensual = 0
    await informeDeuda.then(res=>{
        let deudaFinal = [];
        res.forEach(element=>{
            deudaFinal.push(element.data())
        })
        //console.log(deudaFinal)
        deudaFinal.forEach(element=>{
            valorDeuda += parseInt(element.valorPago)
        })

    }).catch(err=>{
        console.log(err)
    })
    await informeMontoMensual.then(res=>{
        let deudaMontoFinal = [] ;
        res.forEach(element=>{
            deudaMontoFinal.push(element.data())
        })
        //console.log(deudaMontoFinal)
        deudaMontoFinal.forEach(element=>{
            valorMontoMensual += parseInt(element.valorPago)
        })

    }).catch(err=>{
        console.log(err)
    })
    
    //console.log(valorDeuda)
    //console.log(valorMontoMensual)
    return [valorDeuda,valorMontoMensual]




}



module.exports = {
    getData,
    validacionUsuario,
    guardarRegistro,
    listarDesprendibles,
    eliminarRegistro,
    actualizarRegistro,
    informesEstadisticos
}
