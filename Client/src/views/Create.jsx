function Create({ children }) {
   return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
         <div className='h-[20vh] bg-[#FFFF01] w-full flex justify-center items-center'></div>
         {children}
      </div>
   )
}
export default Create
