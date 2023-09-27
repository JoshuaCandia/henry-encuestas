const surveyDataController = require('../controllers/surveyData')

const surveyData = (req, res) => {
  try {
    const response = surveyDataController()
    if (!response) throw new Error()
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

module.exports = surveyData
