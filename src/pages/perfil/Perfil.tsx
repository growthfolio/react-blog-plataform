import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlerta } from "../../util/toastAlerta";
import { PencilSimple } from "@phosphor-icons/react";
import ListarPostagensUsuario from "../../components/postagens/listaPostagens/ListarPostagensUsuario";
import Popup from "reactjs-popup";
import FormularioUsuario from "../../components/usuarios/formularioUsuario/FormularioUsuario";

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro"
      );
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  if (!usuario || !usuario.nome) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="">
        {/* Banner */}
        <div className="w-full h-[400px] bg-gray-300 relative">
          <img
            src="https://placehold.co/1200x400"
            alt="Banner do Perfil"
            className="w-full h-full object-cover"
          />
           <button
            onClick={() => setMostrarFormulario(true)}
            className="absolute top-4 right-4 p-2 bg-gray-400/50 border-sm text-white text-sm font-semibold rounded shadow hover:bg-gray-400/70 transition"
            aria-label="Editar Banner"
          >
            <PencilSimple size={16} weight="bold" />
          </button>

          <Popup
            open={mostrarFormulario}
            onClose={() => setMostrarFormulario(false)}
            modal
            nested
          >
            <FormularioUsuario onClose={() => setMostrarFormulario(false)} />
          </Popup>
        </div>

        {/* Foto do Usuário e Informações */}
        <div className="flex items-center mt-6 px-6 max-w-6xl mx-auto">
          {/* Foto do Usuário */}
          <div className="absolute left-6">
            <div className="flex -mt-11">
              <div className="flex-shrink-0 ">
                <img
                  src={usuario.foto || "https://placehold.co/400x400"}
                  alt={`Foto de perfil de ${usuario.nome}`}
                  className="rounded-full items-center flex w-50 h-40 border-4 border-green-500 shadow-lg"
                />
              </div>
              {/* Informações do Usuário */}
              <div className="ml-8 -mt-8 flex items-center">
                <h1 className="text-4xl font-bold text-gray-800">
                  {usuario.nome}
                </h1>
                {/* Botão Editar */}
              </div>
            </div>
          </div>
        </div>

        {/* Listagem de Postagens */}
        <div>
          <div className="mt-20 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl text-center pb-10 font-semibold text-gray-800 mb-4">
                Suas Postagens
              </h2>
            </div>
            <ListarPostagensUsuario />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
