import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

// Definida a Interface chamada CardPostagemProps, e indicamos que sua estrutura contém uma propriedade chamada post
interface CardPostagemProps {
    post: Postagem  // A propriedade post é um objeto da Model Postagem, ou seja, um objeto com id, texto, titulo, etc
}

function CardPostagem({ post }: CardPostagemProps) {    // Definido que o CardPostagem recebe uma propriedade chamada post e sua estrutura segue a Interface CardPostagemProps
    return (
        <div className='border-slate-300/30 border border-b-0 flex flex-col rounded overflow-hidden justify-between'>
            <div>
                <div className="flex w-full bg-blue-700/90 py-2 px-4 items-center gap-4">
                    <img src={post.usuario?.foto} className='h-12 rounded-full' alt="" />   {/* aqui é exibida a foto do usuário, caso a postagem tenha sido cadastrada com um Usuário diferente de null  */}
                    <h3 className='text-lg font-bold text-center uppercase text-white '>{post.usuario?.nome}</h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{post.titulo}</h4> {/* post é o objeto que é recebido por meio da props. e, titulo é o atributo do objeto */}
                    <p>{post.texto}</p>
                    <p><span className='font-semibold'>Tema:</span> {post.tema?.descricao}</p>
                    <p><span className='font-semibold'>Data:</span> {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    }).format(new Date(post.data))}</p>
                </div>
            </div>
            <div className="flex  ">
                {/* Essa rota envia o usuário para o formulário de edição, passando em sua url, o id da Postagem que vai ser editada */}
                <Link to={`/editarPostagem/${post.id}`} className='w-full rounded-bl-lg text-white bg-blue-600 hover:bg-blue-600/90 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                {/* Essa rota envia o usuário para o formulário de exclusão, passando em sua url, o id da Postagem que vai ser excluída */}
                <Link to={`/deletarPostagem/${post.id}`} className='text-white rounded-br-lg bg-red-600 hover:bg-red-600/90 w-full flex items-center justify-center py-2'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem