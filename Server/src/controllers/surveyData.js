const data = require('../../api/db.json')

const surveyDataController = () => {
  try {
    const formattedData = data.items
    return formattedData
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = surveyDataController
