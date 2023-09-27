//hooks
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useValidations } from '../validations/useValidations'
//components
import Swal from 'sweetalert2'
import { Input } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { RadioGroup, Radio } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
//assets
import logo from '../assets/logo.png'
function Form() {
   const [surveyData, setSurveyData] = useState([])
   const [survey, setSurvey] = useState({
      full_name: '',
      phone_number: '',
      start_date: '',
      preferred_language: '',
      how_found: '',
      newsletter_subscription: false
   })
   const { errors, validate } = useValidations(survey)

   useEffect(() => {
      const execute = async () => {
         const { data } = await axios('http://localhost:3001/')

         setSurveyData(data)
      }
      execute()
   }, [])

   const handleChangeName = (e) => {
      validate(e.target.value)
      setSurvey({ ...survey, full_name: e.target.value })
   }

   const handleChangePhone = (e) => {
      validate(e.target.value)
      setSurvey({ ...survey, phone_number: e.target.value })
   }

   const handleChangeStartDate = (e) => {
      validate(e.target.value)
      setSurvey({ ...survey, start_date: e.target.value })
   }

   const handleChangePreferredLanguage = (e) => {
      validate(e.target.value)
      setSurvey({ ...survey, preferred_language: e.target.value })
   }

   const handleChangeHowFound = (e) => {
      validate(e.target.value)
      setSurvey({ ...survey, how_found: e.target.value })
   }

   const handleSubmit = (e) => {
      if (
         errors.full_name ||
         errors.phone_number ||
         errors.start_date ||
         errors.preferred_language ||
         errors.how_found
      ) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hay errores en el formulario'
         })
      }
      e.preventDefault()
   }

   const handleChangeNewsletter = (e) => {
      setSurvey({ ...survey, newsletter_subscription: e.target.checked })
   }

   return (
      <form
         onSubmit={handleSubmit}
         className='relative bottom-12 px-24 bg-white w-full md:w-[80%]  xl:w-1/2 flex flex-col items-between gap-16 py-12'
      >
         <div className=''>
            <img
               className='w-56'
               src={logo}
               alt=''
            />
         </div>

         {/* Full name */}
         <div>
            <p className='bold text-xl mb-4'>Nombre y Apellido</p>
            <Input
               className='w-full'
               label={surveyData[0]?.label}
               type={surveyData[0]?.type}
               value={survey?.full_name}
               onChange={(e) => handleChangeName(e)}
            />
            {errors.full_name ? (
               <p className='text-red-500'>{errors.full_name}</p>
            ) : (
               <p />
            )}
         </div>
         {/* Phone number */}
         <div>
            <p className='bold text-xl mb-4'>Número de teléfono</p>
            <Input
               className='w-full'
               label={surveyData[1]?.label}
               type={surveyData[1]?.type}
               value={survey?.phone_number}
               onChange={(e) => handleChangePhone(e)}
            />
            {errors.phone_number ? (
               <p className='text-red-500'>{errors.phone_number}</p>
            ) : (
               <p />
            )}
         </div>

         {/* Start date */}
         <div>
            <p className='bold text-xl mb-4'>Fecha de inicio</p>
            <input
               label={surveyData[2]?.label}
               type={surveyData[2]?.type}
               value={survey?.start_date}
               className='bg-gray-100 w-full tap-highlight-transparent shadow-sm px-3 min-h-unit-10 rounded-medium items-centers justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 h-14 py-2 is-filled'
               onChange={(e) => handleChangeStartDate(e)}
            />
            {errors.start_date ? (
               <p className='text-red-500'>{errors.start_date}</p>
            ) : (
               <p />
            )}
         </div>
         {/* Preferred languages */}
         <div>
            <p className='bold text-xl mb-4'>Idioma preferido</p>
            <Select
               isRequired
               label={surveyData[3]?.label}
               placeholder={surveyData[3]?.label}
               aria-label={surveyData[3]?.label}
               className='w-full'
               value={survey?.preferred_language}
               onChange={(e) => handleChangePreferredLanguage(e)}
            >
               {surveyData[3]?.options.map((option, index) => (
                  <SelectItem
                     key={index}
                     value={option.value}
                  >
                     {option.label}
                  </SelectItem>
               ))}
            </Select>
            {errors.preferred_language ? (
               <p className='text-red-500'>{errors.preferred_language}</p>
            ) : (
               <p />
            )}
         </div>

         {/* how found */}
         <div>
            <p className='bold text-xl mb-4'>¿Cómo lo encontraste?</p>
            <RadioGroup
               value={survey?.how_found}
               onChange={(e) => handleChangeHowFound(e)}
            >
               {surveyData[4]?.options.map((option, index) => (
                  <Radio
                     key={index}
                     value={option.value}
                  >
                     {option.label}
                  </Radio>
               ))}
            </RadioGroup>
            {errors.how_found ? (
               <p className='text-red-500'>{errors.how_found}</p>
            ) : (
               <p />
            )}
         </div>
         {/* Newsletter */}
         <div>
            <p className='bold text-xl mb-4'>{surveyData[5]?.label.split(0, 1)}</p>
            <Checkbox
               value={survey?.newsletter_subscription}
               onChange={(e) => handleChangeNewsletter(e)}
            >
               Recibir newsletter
            </Checkbox>
            {errors.newsletter_subscription ? (
               <p className='text-red-500'>{errors.newsletter_subscription}</p>
            ) : (
               <p />
            )}
         </div>

         <div className='flex justify-center items-center'>
            <Button
               type='submit'
               className='w-16'
               onClick={handleSubmit}
               color='primary'
            >
               Enviar
            </Button>
         </div>
      </form>
   )
}

export default Form
