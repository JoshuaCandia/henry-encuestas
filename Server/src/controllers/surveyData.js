const data = require('../../api/db.json')

const surveyDataController = () => {
  try {
    const formattedData = data.items
    return formattedData
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = surveyDataController
