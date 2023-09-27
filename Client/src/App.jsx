import { useState } from 'react'
import Loader from './components/Loader'
import Create from './views/Create'
import Submit from './views/Submit'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Options from './components/Options'
import Cards from './components/Cards'
import Responses from './views/Responses'
import Error404 from './views/404'

function App() {
   const [survey, setSurvey] = useState({
      full_name: '',
      phone_number: '',
      start_date: '',
      preferred_language: '',
      how_found: '',
      newsletter_subscription: false
   })
   const [loading, setLoading] = useState(false)
   const [id, setId] = useState('')
   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <div>
               <Routes>
                  <Route
                     path='/'
                     element={
                        <Create>
                           <Form
                              survey={survey}
                              setSurvey={setSurvey}
                              setLoading={setLoading}
                              setId={setId}
                           />
                        </Create>
                     }
                  />
                  <Route
                     path='/submit'
                     element={
                        <Submit>
                           <Options
                              setSurvey={setSurvey}
                              setLoading={setLoading}
                           />
                        </Submit>
                     }
                  />
                  <Route
                     path='/responses'
                     element={
                        <Responses
                           setSurvey={setSurvey}
                           setLoading={setLoading}
                           id={id}
                        >
                           <Cards />
                        </Responses>
                     }
                  />
                  <Route
                     path='*'
                     element={<Error404 />}
                  />
               </Routes>
            </div>
         )}
      </>
   )
}

export default App
