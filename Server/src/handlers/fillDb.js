const { fillDbController } = require('../controllers/fillDb')

const fillDb = async (req, res) => {
  const { body } = req
  try {
    const response = await fillDbController(body)
    if (!response) throw new Error('Error al llenar base de datos')
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
}

module.exports = fillDb
