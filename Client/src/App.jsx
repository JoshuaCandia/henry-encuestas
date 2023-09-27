import { useState } from 'react'
import Loader from './components/Loader'
import Create from './views/Create'
import Submit from './views/Submit'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Options from './components/Options'
import Responses from './views/Responses'
import Error404 from './views/404'

function App() {
   const [loading, setLoading] = useState(false)
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
                           <Form setLoading={setLoading} />
                        </Create>
                     }
                  />
                  <Route
                     path='/submit'
                     element={
                        <Submit>
                           <Options setLoading={setLoading} />
                        </Submit>
                     }
                  />
                  <Route
                     path='/responses'
                     element={<Responses />}
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
