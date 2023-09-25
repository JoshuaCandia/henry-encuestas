import { useEffect, useState } from 'react'
import axios from 'axios'

//components
import { Input } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
function Form() {
   const [surveyData, setSurveyData] = useState([])

   const [survey, setSurvey] = useState({
      full_name: '',
      phone_number: '',
      start_date: '',
      preferred_language: '',
      how_found: '',
      newsletter_subscription: ''
   })

   useEffect(() => {
      const execute = async () => {
         const { data } = await axios('http://localhost:3001/')

         setSurveyData(data)
      }
      execute()
   }, [])
   console.log(surveyData)
   return (
      <form>
         {/* Full name */}
         <div>
            <Input
               label={surveyData[0]?.label}
               type={surveyData[0]?.type}
               value={survey?.full_name}
               onChange={(e) => setSurvey({ ...survey, full_name: e.target.value })}
            />
         </div>
         {/* Phone number */}
         <div>
            <Input
               label={surveyData[1]?.label}
               type={surveyData[1]?.type}
               value={survey?.phone_number}
               onChange={(e) => setSurvey({ ...survey, full_name: e.target.value })}
            />
         </div>
         {/* Start date */}
         <div>
            <p>Fecha de inicio</p>
            <input
               label={surveyData[2]?.label}
               type={surveyData[2]?.type}
               value={survey?.start_date}
               onChange={(e) => setSurvey({ ...survey, full_name: e.target.value })}
            />
         </div>
         {/* Preferred language */}
         <div>
            <Select
               isRequired
               label={surveyData[3]?.label}
               placeholder={surveyData[3]?.label}
               aria-label={surveyData[3]?.label}
               className='max-w-xs'
               value={survey?.preferred_language}
               onChange={(e) => setSurvey({ ...survey, full_name: e.target.value })}
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
         </div>
      </form>
   )
}

export default Form
