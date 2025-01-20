import { Link } from "react-router-dom";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import Tema from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemaProps) {
  return (
    <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-103 hover:shadow-lg duration-500">
      {/* Header do Card */}
      <header className="py-4 px-6 bg-primary-dark/90 text-white font-bold text-xl flex justify-between items-center">
        {/* Texto do Tema */}
        <span>Tema</span>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <Link
            to={`/editarTema/${tema.id}`}
            className="flex items-center justify-center w-9 h-9 rounded-full text-white bg-none hover:bg-primary active:scale-95 transition-all duration-200"
            title="Editar Tema"
          >
            <PencilSimple size={20} weight="bold" />
          </Link>
          <Link
            to={`/deletarTema/${tema.id}`}
            className="flex items-center justify-center w-9 h-9 rounded-full text-white bg-none hover:bg-red-500 active:scale-95 transition-all duration-200"
            title="Deletar Tema"
          >
            <Trash size={20} weight="bold" />
          </Link>
        </div>
      </header>

      {/* Descrição do Tema */}
      <div className="p-6 bg-slate-200 flex-grow">
        <p className="text-gray-800 text-lg font-medium mb-4">{tema.descricao}</p>

        {/* Lista de Postagens Associadas */}
        <div>
          <h3 className="text-blue-700 font-semibold mb-2">Postagens Associadas:</h3>
          {tema.postagem && tema.postagem.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {tema.postagem.map((postagem) => (
                <li key={postagem.id}>
                  <Link
                    to={`/postagens/${postagem.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {postagem.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">Nenhuma postagem associada a este tema.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardTemas;
