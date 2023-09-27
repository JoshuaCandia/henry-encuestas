import { Button } from '@nextui-org/react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
function Options({ setLoading, setSurvey }) {
   const navigate = useNavigate()

   const handleClearLocalStorage = () => {
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

   const handleClickHome = () => {
      setLoading(true)
      setTimeout(() => {
         handleClearLocalStorage()
         setLoading(false)
         navigate('/')
      }, 500)
   }
   const handleClickResponses = () => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         navigate('/responses')
      }, 500)
   }

   return (
      <div className='shadow-lg relative bottom-12 px-12 py-12 bg-white w-full md:w-[50%] xl:w-1/3 flex flex-col items-between gap-4'>
         <div className='flex justify-start w-full'>
            <img
               src={logo}
               alt='logo henry'
               className='w-32'
            />
         </div>
         <h2 className='text-center font-semibold text-md lg:text-xl xl:text-2xl pb-4'>
            Felicidades! tus respuestas han sido enviadas
         </h2>
         <div className='flex items-center justify-center gap-8'>
            <Button
               color='primary'
               className='h-8 px-6'
               size='sm'
               onClick={() => handleClickHome()}
            >
               Llenar otra encuesta
            </Button>
            <Button
               color='primary'
               className='h-8 px-6'
               size='sm'
               onClick={() => handleClickResponses()}
            >
               Ver respuestas
            </Button>
         </div>
      </div>
   )
}

export default Options
