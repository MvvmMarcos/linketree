import { Link } from 'react-router-dom'
export default function Error(){
  return (
    <div className=' flex flex-col items-center justify-center w-full text-white min-h-screen'>
        <h1 className='font-bold text-6xl mb-2'>404</h1>
        <h1 className='font-bold text-xl mb-4'>Página não encontrada</h1>
        <p className='italic text-1xl mb-4'>Você caiu em uma página que não existe!</p>
        <Link to='/' className='bg-gray-50/20 py-1 px-4 rounded-md'>Voltar para Home</Link>
    </div>
  )
}
