import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { HamburguerIcon, NavMobileItem } from './index.tsx'
import { useNavMobileContext } from '../../contexts/NavMobileContext.tsx'
import { X } from '@phosphor-icons/react'





function Navbar() {
  let navigate = useNavigate()
  const { isVisible, setIsVisible } = useNavMobileContext();
  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    alert('Usuário deslogado com sucesso')
    navigate('/login')
  }

  let navbarComponent

  if (usuario.token !== "") {
    navbarComponent = (
      <>
        <div className='w-full bg-blue-700 text-white flex justify-around  py-4  '>
          <div className="w-full h-full max-w-7xl mx-auto
         flex justify-between text-lg">
            <Link to='/home' className='text-2xl font-bold uppercase'>Blog Pessoal</Link>

            <div className='hidden md:flex gap-6  mr-2 '>
              <Link to='/postagens' className='hover:underline'>Postagens</Link>
              <Link to='/temas' className='hover:underline'>Temas</Link>
              <Link to='/cadastroTema' className='hover:underline'>Cadastrar tema</Link>
              <Link to='/perfil' className='hover:underline'>Perfil</Link>
              <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
            </div>
            <div className='flex md:hidden gap-6 items-center mx-4'>
              <button onClick={() => setIsVisible((prev) => !prev)}>
                {isVisible ? (
                  <span className='font-bold text-2xl'><X size={32} /></span>
                ) : (
                  <HamburguerIcon />
                )}

              </button>
            </div>
          </div>
        </div>
        {isVisible && (
          // <div className='w-full h-[calc(100vh-81px)] fixed top-14 left-0 bg-blue-700 border-2 border-blue-600/80'>
            <div  className={`w-full h-[calc(100vh-81px)] fixed top-14 right-0 bg-blue-700 border-2 border-blue-600/80 transition-transform transform ease-in-out duration-2000 ${
              isVisible ? 'translate-x-50' : 'translate-x-full'
            }`}>
            <div className='flex flex-col items-stretch justify-center'>

              <NavMobileItem to='/postagens'>Postagens</NavMobileItem>
              <NavMobileItem to='/temas'>Temas</NavMobileItem>
              <NavMobileItem to='/cadastroTema'>Cadastrar tema</NavMobileItem>
              <NavMobileItem to='/perfil'>Perfil</NavMobileItem>
              <div onClick={logout}
              className='w-full p-4 border-b border-blue-500/80
              hover:border-gray-100/50 text-gray-100 text-lg
               rounded-bl-lg 
               active:bg-blue-600/20 active:transition-shadow
               active:duration-300
               active:ease-out active:shadow-lg active:shadow-gray-100/10
               transition duration-200 ease-in-out cursor-pointer'
              >Sair</div>
            
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar