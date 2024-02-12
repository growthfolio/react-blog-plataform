import homeLogo from '../../assets/home.svg'
import './Home.css';
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';



function Home() {
    return (
        <>
        <div className="bg-blue-700 flex justify-center">
          <div className='container md:grid md:grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-4xl md:text-5xl font-bold'>Seja bem vindo!</h2>
              <p className='text-sm md:text-xl'>O que voce gostaria de criar?</p>
  
              <div className="flex justify-around gap-4">
              <ModalPostagem />
              <button className='rounded bg-white text-blue-800 py-2 px-4'>Ver postagens</button>
            </div>
            </div>
  
            <div className="hidden lg:flex justify-center   ">
              <img src={homeLogo} alt="" className='w-2/3 ' />
      
            </div>
          </div>
        </div>
        <ListaPostagens />
      </>
    );
}

export default Home;