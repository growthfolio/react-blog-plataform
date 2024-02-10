import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import './ModalPostagem.css';

function ModalPostagem() {
    const isMobile = window.innerWidth <= 768; // Defina um ponto de quebra para dispositivos móveis

    const contentStyle = {
        width: isMobile ? '90%' : 'auto',
        height: isMobile ? 'auto' : 'auto',
        padding: isMobile ? '20px' : '0',
        paddingTop: isMobile ? '0' : '20px',
        
    };

    return (
        <>
            <Popup
                trigger={
                    <button className='border rounded px-4 hover:bg-white hover:text-indigo-800'>
                        Nova postagem
                    </button>
                }
                modal
                contentStyle={contentStyle} // Defina o estilo do conteúdo do popup
            >
                <div>
                    <FormularioPostagem />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;
