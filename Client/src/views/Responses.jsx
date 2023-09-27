import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@nextui-org/react'
function Responses({ id, setLoading, setSurvey, children }) {
   const navigate = useNavigate()
   const [responses, setResponses] = useState([])

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

   const handleGoBack = () => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         handleClearLocalStorage()
         navigate('/')
      }, 500)
   }

   useEffect(() => {
      const fetchDataAndStoreInSessionStorage = async () => {
         try {
            const { data } = await axios.get('http://localhost:3001/responses/' + id)
            setResponses(data)

            sessionStorage.setItem('responsesData', JSON.stringify(data))
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }
      const storedResponsesData = sessionStorage.getItem('responsesData')
      if (storedResponsesData) {
         setResponses(JSON.parse(storedResponsesData))
      } else {
         fetchDataAndStoreInSessionStorage()
      }
   }, [id])

   return (
      <div className='flex flex-col pt-12 lg:pt-24 justify-start items-center gap-8 min-h-screen'>
         <h1 className='text-3xl'>Encuesta</h1>
         {React.cloneElement(children, { responses })}

         <div className='md:absolute md:top-12 md:left-36 lg:top-16'>
            <Button onClick={handleGoBack}>Volver al inicio</Button>
         </div>
      </div>
   )
}

export default Responses
