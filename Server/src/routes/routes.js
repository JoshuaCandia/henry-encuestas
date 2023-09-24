const { Router } = require('express')
const fillDb = require('../handlers/fillDb')
const router = Router()

router.post('/filldb', fillDb)

module.exports = router
