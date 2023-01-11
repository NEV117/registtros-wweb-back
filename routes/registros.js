const express = require('express')
const {
    createRegistro,
    getRegistros,
    getUnRegistro,
    borrarRegistro,
    actualizarRegistro,
    busqueda,
    getResDate
} = require('../controllers/resController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

//get resgistros
router.get('/', getRegistros)

//get  solo un resgistros
router.get('/:id', getUnRegistro)

//busqueda
router.get('/busqueda', busqueda)

//buscar emtre fechas
router.get('/fechas', getResDate)


//post  un NUEVO resgistros
router.post('/', createRegistro)

//DELETE  un resgistro
router.delete('/:id', borrarRegistro)

//UPDATE  un resgistros
router.patch('/:id', actualizarRegistro)

module.exports = router 