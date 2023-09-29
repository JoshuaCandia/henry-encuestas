//hooks
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useValidations } from '../validations/useValidations'
import { useNavigate } from 'react-router-dom'

//components
import Swal from 'sweetalert2'
import {
   Input,
   Select,
   SelectItem,
   RadioGroup,
   Radio,
   Checkbox,
   Button
} from '@nextui-org/react'
//assets
import logo from '../assets/logo.png'

function Form({ setLoading, id, setId, survey, setSurvey }) {
   let navigate = useNavigate()

   const [edit, setEdit] = useState(false)
   const [surveyData, setSurveyData] = useState([])
   const { errors, validate } = useValidations()
   useEffect(() => {
      const execute = async () => {
         const { data } = await axios('http://localhost:3001/')

         setSurveyData(data)
      }
      execute()
   }, [])

   useEffect(() => {
      const savedSurveyData = localStorage.getItem('surveyData')

      if (savedSurveyData) {
         const parsedSurveyData = JSON.parse(savedSurveyData)
         setSurvey(parsedSurveyData)
         setEdit(true)
      }
   }, [setSurvey])
   const handleChange = (e) => {
      validate(e.target.name, e.target.value)
      setSurvey({ ...survey, [e.target.name]: e.target.value })
   }

   const handleChangeNewsletter = (e) => {
      setSurvey({ ...survey, newsletter_subscription: e.target.checked })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

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
      } else if (
         !survey.full_name ||
         !survey.phone_number ||
         !survey.start_date ||
         !survey.preferred_language ||
         !survey.how_found
      ) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los campos no pueden estar vacios'
         })
      } else {
         localStorage.setItem('surveyData', JSON.stringify(survey))

         Swal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Enviar!'
         }).then((result) => {
            if (result.isConfirmed) {
               setLoading(true)
               setTimeout(() => {
                  setLoading(false)
                  navigate('/submit')
               }, 500)
            } else {
               navigate('/')
            }
         })
         if (edit) {
            console.log(`http://localhost:3001/update/${id}`)
            axios
               .put(`http://localhost:3001/update/${id}`, survey)
               .then((response) => {
                  setId(response.data.id)
               })
               .catch((error) => {
                  console.error(`Error en la solicitud PUT: ${error.message}`)
               })
         } else {
            axios
               .post('http://localhost:3001/filldb', survey)
               .then((response) => {
                  const id = response.data.id
                  setId(id)
               })
               .catch((error) => {
                  console.error(`Error en la solicitud POST: ${error.message}`)
               })
         }
      }
   }
   const handleCancel = () => {
      window.scrollTo(0, 0)
      setEdit(false)
      localStorage.removeItem('surveyData')

      setSurvey({
         full_name: '',
         phone_number: '',
         start_date: '',
         preferred_language: '',
         how_found: '',
         newsletter_subscription: false
      })
   }

   return (
      <form
         onSubmit={handleSubmit}
         className='shadow-lg relative bottom-12 px-12 md:px-24 py-12 bg-white w-full md:w-[50%] xl:w-1/3 flex flex-col items-between gap-4 '
      >
         <img
            className='w-32'
            src={logo}
            alt=''
         />

         {/* Full name */}
         <div>
            <p className='bold text-md mb-4'>Nombre y Apellido</p>
            <Input
               className='w-full text-sm'
               label={surveyData[0]?.label}
               type={surveyData[0]?.type}
               name={surveyData[0]?.name}
               value={survey?.full_name}
               onChange={(e) => handleChange(e)}
            />
            {errors.full_name ? (
               <p className='text-sm text-red-500 h-8'>{errors.full_name}</p>
            ) : (
               <p className='h-8' />
            )}
         </div>
         {/* Phone number */}
         <div>
            <p className='bold text-md mb-4'>Número de teléfono</p>
            <Input
               className='w-full text-sm'
               label={surveyData[1]?.label}
               type={surveyData[1]?.type}
               name={surveyData[1]?.name}
               value={survey?.phone_number}
               onChange={(e) => handleChange(e)}
            />
            {errors.phone_number ? (
               <p className='text-sm text-red-500 h-8'>{errors.phone_number}</p>
            ) : (
               <p className='h-8' />
            )}
         </div>

         {/* Start date */}
         <div>
            <p className='bold text-md mb-4'>Fecha de inicio</p>
            <input
               label={surveyData[2]?.label}
               type={surveyData[2]?.type}
               name={surveyData[2]?.name}
               value={survey?.start_date}
               className='bg-gray-100 w-full tap-highlight-transparent shadow-sm px-3 min-h-unit-10 rounded-medium items-centers justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 h-14 py-2 is-filled'
               onChange={(e) => handleChange(e)}
            />
            {errors.start_date ? (
               <p className='text-sm text-red-500 h-8'>{errors.start_date}</p>
            ) : (
               <p className='h-8' />
            )}
         </div>
         {/* Preferred languages */}
         <div>
            <p className='bold text-md mb-4'>Idioma preferido</p>
            <Select
               label={surveyData[3]?.label}
               placeholder={surveyData[3]?.label}
               aria-label={surveyData[3]?.label}
               name={surveyData[3]?.name}
               className='w-full'
               value={survey?.preferred_language}
               onChange={(e) => handleChange(e)}
            >
               {surveyData[3]?.options.map((option) => (
                  <SelectItem
                     key={option.label}
                     value={option.label}
                  >
                     {option.label}
                  </SelectItem>
               ))}
            </Select>
            {errors.preferred_language ? (
               <p className='text-sm text-red-500 h-8'>
                  {errors.preferred_language}
               </p>
            ) : (
               <p className='h-8' />
            )}
         </div>

         {/* how found */}
         <div>
            <p className='bold text-md mb-4'>¿Cómo lo encontraste?</p>
            <RadioGroup
               name='how_found'
               value={survey?.how_found}
               onChange={(e) => handleChange(e)}
            >
               {surveyData[4]?.options.map((option, index) => (
                  <Radio
                     key={index}
                     value={option.label}
                  >
                     {option.label}
                  </Radio>
               ))}
            </RadioGroup>
            {errors.how_found ? (
               <p className='text-sm text-red-500 h-8'>{errors.how_found}</p>
            ) : (
               <p className='h-8' />
            )}
         </div>
         {/* Newsletter */}
         <div>
            <p className='bold text-md mb-4'>{surveyData[5]?.label.split(0, 1)}</p>
            <Checkbox
               value={survey?.newsletter_subscription}
               onChange={(e) => handleChangeNewsletter(e)}
            >
               Recibir newsletter
            </Checkbox>
            {errors.newsletter_subscription ? (
               <p className='text-sm text-red-500 h-8'>
                  {errors.newsletter_subscription}
               </p>
            ) : (
               <p className='h-8' />
            )}
         </div>

         <div className='flex justify-center items-center'>
            {edit ? (
               <div className='flex gap-2'>
                  <Button
                     type='submit'
                     className='w-16'
                     onClick={handleSubmit}
                     color='primary'
                  >
                     Editar
                  </Button>
                  <Button
                     className='w-16'
                     onClick={handleCancel}
                  >
                     Cancelar
                  </Button>
               </div>
            ) : (
               <Button
                  type='submit'
                  className='w-16'
                  onClick={handleSubmit}
                  color='primary'
               >
                  Enviar
               </Button>
            )}
         </div>
      </form>
   )
}

export default Form
