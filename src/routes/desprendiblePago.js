const router = require('express').Router()
const desprendiblePg = require('../controller/desprendiblePagoController')

router.post('/guardar',(req,res)=>{
    desprendiblePg.guardar(req,res);
 })

 router.get('/listar',(req,res)=>{
    desprendiblePg.listar(req,res);
 })

 router.delete('/delete',(req,res)=>{
    desprendiblePg.eliminar(req,res);
 })

 router.put('/actualizar',(req,res)=>{
    desprendiblePg.actualizar(req,res);
 })


 
module.exports =  router 