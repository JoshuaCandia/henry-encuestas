const getResponsesController = require('../controllers/getResponsesById')

const getResponses = async (req, res) => {
  const { id } = req.params

  try {
    const getResponses = await getResponsesController(id)
    res.status(200).json(getResponses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = getResponses
