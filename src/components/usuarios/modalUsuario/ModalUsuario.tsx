import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalUsuario.css";
import FormularioUsuario from "../formularioUsuario/FormularioUsuario";

function ModalUsuario() {
  return (
    <>
      <Popup
        trigger={
          <button
            className="border rounded rounded-b-none px-4 hover:bg-white hover:text-blue-800 
                      transition duration-500 ease-in-out"
          >
            Novo Usuário
          </button>
        }
        modal
      >
        <div>
          <FormularioUsuario onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      </Popup>
    </>
  );
}

export default ModalUsuario;
