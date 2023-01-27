const router = require('express').Router()
const informes = require('../controller/reporteria')

router.get('/informesAll',(req,res)=>{
    console.log("ENTRO POR INFORMES ALL")
    informes.informesEstadisticos(req,res);
 })

 

 
module.exports =  router 