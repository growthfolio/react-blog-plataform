import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Usuario from "../../../models/Usuario";
import { atualizar, buscar } from "../../../services/Service";
import { toastAlerta } from "../../../util/toastAlerta";

function FormularioUsuario() {
  const navigate = useNavigate();
  const { usuario: usuarioLogado, handleLogout } = useContext(AuthContext);
  const token = usuarioLogado.token;

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/");
    } else {
      carregarDadosUsuario();
    }
  }, [token]);

  async function carregarDadosUsuario() {
    try {
      await buscar(`/usuarios/${usuarioLogado.id}`, setUsuario, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      } else {
        toastAlerta("Erro ao carregar os dados do usuário", "erro");
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  async function salvarUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const dadosAtualizados = { ...usuario };

    try {
      await atualizar(`/usuarios/atualizar`, dadosAtualizados, setUsuario, {
        headers: {
          Authorization: token,
        },
      });
      toastAlerta("Usuário atualizado com sucesso", "sucesso");
    } catch (error) {
      toastAlerta("Erro ao salvar o usuário", "erro");
    }
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">Editar Usuário</h1>

      <form onSubmit={salvarUsuario} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome</label>
          <input
            value={usuario.nome}
            onChange={atualizarEstado}
            type="text"
            placeholder="Nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="usuario">Email</label>
          <input
            value={usuario.usuario}
            onChange={atualizarEstado}
            type="email"
            placeholder="Email"
            name="usuario"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto (URL)</label>
          <input
            value={usuario.foto}
            onChange={atualizarEstado}
            type="text"
            placeholder="URL da Foto"
            name="foto"
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600/90 hover:bg-blue-600 text-white font-bold w-1/2 mx-auto block py-2"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default FormularioUsuario;
