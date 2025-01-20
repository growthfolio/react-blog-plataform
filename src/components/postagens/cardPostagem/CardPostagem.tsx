import { Link } from 'react-router-dom';
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Postagem from '../../../models/Postagem';

interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  return (
    <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-103 hover:shadow-lg duration-500">
      {/* Header com informações do usuário */}
      <div className="flex items-center justify-between bg-primary-dark py-3 px-4 gap-4">
        <div className="flex items-center gap-4">
          <img
            src={post.usuario?.foto}
            alt={`Foto de perfil de ${post.usuario?.nome || 'usuário anônimo'}`}
            className="h-12 w-12 rounded-full border-2 border-white"
          />
          <h3 className="text-lg font-bold text-white">{post.usuario?.nome}</h3>
        </div>

        {/* Botões de ação */}
        <div className="flex items-center gap-2">
          <Link
            to={`/editarPostagem/${post.id}`}
            className="flex items-center justify-center w-9 h-9 rounded-full text-white bg-none hover:bg-primary active:scale-95 transition-all duration-200"
            title="Editar Postagem"
          >
            <PencilSimple size={20} weight="bold" />
          </Link>
          <Link
            to={`/deletarPostagem/${post.id}`}
            className="flex items-center justify-center w-9 h-9 rounded-full text-white bg-none hover:bg-red-500 active:scale-95 transition-all duration-200"
            title="Excluir Postagem"
          >
            <Trash size={20} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Conteúdo da postagem */}
      <div className="p-4 space-y-2">
        <h4 className="text-xl font-semibold text-gray-800">{post.titulo}</h4>
        <p className="text-gray-700">{post.texto}</p>
      </div>

      {/* Footer do card */}
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700">
          Tema: <span className="text-gray-600">{post.tema?.descricao}</span>
        </p>
        <p className="text-sm text-gray-600">
          {new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(post.data))}
        </p>
      </div>
    </div>
  );
}

export default CardPostagem;
