import { useState } from 'react'

export const useValidations = () => {
   const [errors, setErrors] = useState({
      full_name: '',
      phone_number: '',
      start_date: '',
      preferred_language: '',
      how_found: ''
   })

   const validate = (fieldName, value) => {
      const newErrors = { ...errors }

      switch (fieldName) {
         case 'full_name': {
            const regex = /^[A-Za-z\s]+$/
            if (!value) {
               newErrors.full_name = 'No puede enviar un nombre vacío'
            } else if (!regex.test(value)) {
               newErrors.full_name =
                  'Solo se permiten letras y espacios, sin números ni caracteres especiales'
            } else {
               newErrors.full_name = ''
            }
            break
         }

         case 'phone_number': {
            const regex = /^\d{10}$/
            if (!value) {
               newErrors.phone_number = 'El teléfono no puede estar vacío'
            } else if (!regex.test(value)) {
               newErrors.phone_number =
                  'El teléfono debe tener 10 dígitos sin guiones ni paréntesis'
            } else {
               newErrors.phone_number = ''
            }
            break
         }

         case 'start_date': {
            if (!value.length) {
               newErrors.start_date = 'Debe seleccionar una fecha'
            } else {
               const selectedDate = new Date(value)
               const today = new Date()

               if (selectedDate > today) {
                  newErrors.start_date = 'La fecha no puede ser mayor a hoy'
               } else {
                  newErrors.start_date = ''
               }
            }
            break
         }

         case 'preferred_language':
            if (!value.length) {
               newErrors.preferred_language = 'Debe seleccionar un idioma'
            } else {
               newErrors.preferred_language = ''
            }
            break

         case 'how_found':
            if (value.length === 0) {
               newErrors.how_found = 'Seleccione una opción'
            } else {
               newErrors.how_found = ''
            }
            break

         default:
            break
      }

      setErrors(newErrors)
   }

   return { errors, validate }
}
