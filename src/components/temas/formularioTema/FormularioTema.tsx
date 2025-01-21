import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../util/toastAlerta';

function FormularioTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta('Tema atualizado com sucesso', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlerta('Erro ao atualizar o Tema', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta('Tema cadastrado com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlerta('Erro ao cadastrar o Tema', 'erro');
        }
      }
    }

    retornar();
  }

  function retornar() {
    navigate('/temas');
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto p-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6">
        {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
      </h1>

      <form
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200"
        onSubmit={gerarNovoTema}
      >
        <div className="flex flex-col gap-4">
          <label
            htmlFor="descricao"
            className="text-gray-700 font-semibold text-sm"
          >
            Descrição do tema
          </label>
          <input
            type="text"
            placeholder="Digite a descrição do tema"
            name="descricao"
            id="descricao"
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioTema;
