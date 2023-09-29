const { Router } = require('express')
const router = Router()
// handlers
const surveyData = require('../handlers/surveyData')
const getResponses = require('../handlers/getResponsesById')

const fillDb = require('../handlers/fillDb')
const updateSurvey = require('../handlers/updateSurvey')

// routes
router.get('/', surveyData)
router.get('/responses/:id', getResponses)
router.post('/filldb', fillDb)
router.put('/update/:id', updateSurvey)
module.exports = router
