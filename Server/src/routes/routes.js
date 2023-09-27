const { Router } = require('express')
const router = Router()
// handlers
const fillDb = require('../handlers/fillDb')
const surveyData = require('../handlers/surveyData')
const getResponses = require('../handlers/getResponsesById')
// routes
router.get('/', surveyData)
router.get('/responses/:id', getResponses)
router.post('/filldb', fillDb)

module.exports = router
