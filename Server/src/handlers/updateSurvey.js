const updateSurveyController = require('../controllers/updateSurvey')

const updateSurvey = async (req, res) => {
  const id = req.params.id
  const newData = req.body

  const updated = await updateSurveyController(id, newData)

  if (updated) {
    res.status(200).json({ message: 'Registro actualizado exitosamente' })
  } else {
    res
      .status(404)
      .json({ error: 'No se encontró el registro con la ID proporcionada' })
  }
}

module.exports = updateSurvey
