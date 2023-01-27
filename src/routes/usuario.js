const router = require('express').Router()
const usuarioController = require('../controller/usuarioController')

router.get('/listar',(req,res)=>{
   usuarioController.listar(req,res);
})

router.post('/guardar',(req,res)=>{
    usuarioController.guardar(req,res);
 })

router.post('/validacion',(req,res)=>{
   usuarioController.validarUsuario(req,res);
   console.log(req.body)
})



module.exports =  router 