const router = require('express').Router();
const usuario = require('./usuario');
const desprendible = require('./desprendiblePago')
const reporteria = require('./reporteria')

router.use('/usuario',usuario)
router.use('/desprendible',desprendible)
router.use('/informes',reporteria)

module.exports = router
