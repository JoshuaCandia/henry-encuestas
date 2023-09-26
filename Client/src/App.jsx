import Form from './components/Form'
import logo from './assets/logo.png'
function App() {
   return (
      <div className='flex flex-col bg-[#FFFF01] justify-center items-center min-h-scree'>
         <div className='h-[20vh] w-full flex justify-center items-center'>
            <img
               src={logo}
               alt=''
            />
         </div>
         <Form />
      </div>
   )
}

export default App
