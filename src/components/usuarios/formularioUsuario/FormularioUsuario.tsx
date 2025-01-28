import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Usuario from "../../../models/Usuario";
import { atualizar, buscar } from "../../../services/Service";
import { toastAlerta } from "../../../util/toastAlerta";
import { UploadSimple, X } from "@phosphor-icons/react";
import { RotatingLines } from "react-loader-spinner";

interface FormularioUsuarioProps {
  onClose: () => void;
}

function FormularioUsuario({ onClose }: FormularioUsuarioProps) {
  const navigate = useNavigate();
  const { usuario: usuarioLogado, handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const token = usuarioLogado.token;

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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


  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APIGATEWAY_URL}/generate-url?fileName=${file.name}&operation=put`
      );

      if (!response.ok) {
        throw new Error("Erro ao obter URL pré-assinada");
      }

      const { url } = await response.json();

      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Erro ao fazer upload para o S3");
      }

      return url.split("?")[0];
    } catch (error) {
      console.error("Erro no upload:", error);
      return "";
    }
  };

  async function salvarUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      let fotoUrl = usuario.foto;
  
      if (selectedFile) {
        fotoUrl = await uploadToS3(selectedFile);
      }
  
      const dadosAtualizados = { ...usuario, foto: fotoUrl };
  
      await atualizar(`/usuarios/atualizar`, dadosAtualizados, setUsuario, {
        headers: {
          Authorization: token,
        },
      });
  
      toastAlerta("Usuário atualizado com sucesso", "sucesso");
  
      usuarioLogado.nome = dadosAtualizados.nome;
      usuarioLogado.foto = dadosAtualizados.foto;
  
      onClose();
    } catch (error) {
      toastAlerta("Erro ao salvar o usuário", "erro");
    } finally {
      setIsLoading(false);
    }
  }
  
  

  return (
    <div className="container relative flex flex-col mx-auto items-center">
      {/* Botão de Fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-700 hover:text-red-600 transition-colors z-10"
        title="Fechar Modal"
      >
        <X size={32} weight="bold" />
      </button>

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
          <label htmlFor="foto">Foto</label>
          <div className="relative">
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              className="block py-2 w-full text-gray-600 file:mr-8 file:w-[10px] file:py-2 file:px-0 file:rounded-lg 
              file:border-0 file:text-white/0 file:bg-none file:transition-all file:cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                }
              }}
            />
            <button
              type="button"
              className="absolute left-0 rounded top-1/2 transform -translate-y-1/2 bg-primary-dark hover:bg-primary-dark/80 text-white p-3 flex items-center gap-2 transition-all"
              onClick={() => document.getElementById("foto")?.click()}
            >
              <UploadSimple size={20} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`rounded bg-neutral-dark hover:bg-neutral text-white w-full py-3 flex justify-center items-center transition-all duration-300 ${
            isLoading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Salvar</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormularioUsuario;
