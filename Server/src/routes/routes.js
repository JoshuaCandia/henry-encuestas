const { Router } = require('express')
const router = Router()
// handlers
const fillDb = require('../handlers/fillDb')
const surveyData = require('../handlers/surveyData')

// routes
router.get('/', surveyData)
router.post('/filldb', fillDb)

module.exports = router
