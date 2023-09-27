import { useNavigate } from 'react-router-dom'
import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Divider,
   Image,
   Link
} from '@nextui-org/react'

function Cards({ responses }) {
   const navigate = useNavigate()
   const {
      fullName,
      phoneNumber,
      startDate,
      preferredLanguage,
      howFound,
      newsletterSubscription
   } = responses

   function transformDate(fecha) {
      const date = new Date(fecha)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
   }
   const date = transformDate(startDate)
   const newsletter = newsletterSubscription ? 'Si' : 'No'
   return (
      <Card className='max-w-[400px]'>
         <CardHeader className='flex gap-3'>
            <Image
               alt='nextui logo'
               height={40}
               radius='sm'
               src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
               width={40}
            />
            <div className='flex flex-col'>
               <p className='text-md'>{fullName}</p>
               <p className='text-small text-default-500'>{phoneNumber}</p>
            </div>
         </CardHeader>
         <Divider />
         <CardBody>
            <p>Fecha de Inicio: {date}</p>
            <p>Como nos encontro:{howFound}</p>
            <p>Idioma Preferido: {preferredLanguage}</p>
            <p>Suscripción a Newsletter: {newsletter}</p>
         </CardBody>
         <Divider />
         <CardFooter>
            <Link
               className='hover:cursor-pointer'
               onClick={() => navigate('/')}
            >
               Editar
            </Link>
         </CardFooter>
      </Card>
   )
}

export default Cards
