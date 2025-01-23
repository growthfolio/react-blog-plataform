import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { toastAlerta } from "../../util/toastAlerta";
import cadastroVideo from "../../assets/globe-5fdfa9a0f4.mp4";
import { UploadSimple } from "@phosphor-icons/react";

function Cadastro() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  const [primeiroNome, setPrimeiroNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [formError, setFormError] = useState<Record<string, string>>({});

  function getInputClasses(hasError: boolean): string {
    return `border-2 rounded-[12px] rounded-tl-none p-3 transition-all outline-none ${
      hasError
        ? "border-red-500 ring-red-500 focus:ring-red-500"
        : "border-slate-700/40 focus:ring-blue-500"
    }`;
  }

  function renderError(field: string): JSX.Element | null {
    return formError[field] ? (
      <span className="text-red-500 text-sm mt-1">{formError[field]}</span>
    ) : null;
  }

  function atualizarCampo(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "primeiroNome") {
      setPrimeiroNome(value);
      setUsuario((prev) => ({
        ...prev,
        nome: `${value} ${sobrenome}`.trim(),
      }));
    } else if (name === "sobrenome") {
      setSobrenome(value);
      setUsuario((prev) => ({
        ...prev,
        nome: `${primeiroNome} ${value}`.trim(),
      }));
    } else {
      setUsuario({
        ...usuario,
        [name]: value,
      });
    }

    if (value.trim() !== "") {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConfirmaSenha(value);

    if (value !== usuario.senha) {
      setFormError((prev) => ({
        ...prev,
        confirmaSenha: "As senhas não conferem.",
      }));
    } else {
      setFormError((prev) => ({ ...prev, confirmaSenha: "" }));
    }
  }

  function validarFormulario() {
    const erros: Record<string, string> = {};
    let isValid = true;

    if (!primeiroNome.trim()) {
      erros.primeiroNome = "O campo Primeiro Nome é obrigatório.";
      isValid = false;
    } else if (primeiroNome.length < 2) {
      erros.primeiroNome = "O Primeiro Nome deve ter pelo menos 2 caracteres.";
      isValid = false;
    }

    if (!sobrenome.trim()) {
      erros.sobrenome = "O campo Sobrenome é obrigatório.";
      isValid = false;
    } else if (sobrenome.length < 2) {
      erros.sobrenome = "O Sobrenome deve ter pelo menos 2 caracteres.";
      isValid = false;
    }

    if (!usuario.usuario || usuario.usuario.trim() === "") {
      erros.usuario = "O campo Usuário é obrigatório.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.usuario)) {
      erros.usuario = "Insira um endereço de e-mail válido.";
      isValid = false;
    }

    if (
      usuario.foto &&
      !/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/.test(
        usuario.foto
      )
    ) {
      erros.foto = "Insira uma URL válida para a foto.";
      isValid = false;
    }

    if (confirmaSenha !== usuario.senha) {
      erros.confirmaSenha = "As senhas não conferem.";
      isValid = false;
    }

    setFormError(erros);
    return isValid;
  }

  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APIGATEWAY_URL}/generate-url?fileName=${
          file.name
        }&operation=put`
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

      return url.split("?")[0]; // Retorna o URL público do arquivo
    } catch (error) {
      console.error("Erro no upload:", error);
      return "";
    }
  };

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validarFormulario()) {
      try {
        let fotoUrl = "";

        if (selectedFile) {
          fotoUrl = await uploadToS3(selectedFile);
        }

        const usuarioAtualizado = {
          ...usuario,
          foto: fotoUrl,
        };

        await cadastrarUsuario(`/usuarios/cadastrar`, usuarioAtualizado, () => {
          toastAlerta("Usuário cadastrado com sucesso!", "sucesso");
          navigate("/login");
        });
      } catch (error) {
        toastAlerta("Erro ao cadastrar usuário. Tente novamente.", "erro");
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-gray-100">
        <div className="fundoCadastro hidden lg:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={cadastroVideo} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className="content">
            <h1>Bem-vindo ao nosso site!</h1>
            <p>Entre Agora e explore nosso mundo...</p>
            <a className="cursor-pointer" onClick={() => navigate("/login")}>
              Entrar
            </a>
          </div>
        </div>{" "}
        <div className="w-full flex justify-center items-center">
          <div></div>
          <form
            className="flex justify-center h-screen items-center px-20 flex-col w-full gap-6 bg-white p-8 rounded-lg shadow-lg"
            onSubmit={cadastrarNovoUsuario}
          >
            <h2 className="text-slate-900 text-4xl lg:text-3xl mb-2">
              Crie sua conta
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Insira seus dados para criar uma conta.
            </p>
            {/* input section */}
            <div className="flex flex-col w-full gap-6 px-20">
              <div className="flex flex-row gap-2 w-full ">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="primeiroNome"
                    className="text-gray-700 font-semibold"
                  >
                    Primeiro Nome
                  </label>
                  <input
                    type="text"
                    id="primeiroNome"
                    name="primeiroNome"
                    placeholder="Digite seu primeiro nome"
                    className={`rounded-r-none ${getInputClasses(
                      !!formError.primeiroNome
                    )}`}
                    value={primeiroNome}
                    onChange={atualizarCampo}
                  />
                  {renderError("primeiroNome")}
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="sobrenome"
                    className="text-gray-700 font-semibold"
                  >
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    placeholder="Digite seu sobrenome"
                    className={`rounded-l-none rounded-t-none ${getInputClasses(
                      !!formError.sobrenome
                    )}`}
                    value={sobrenome}
                    onChange={atualizarCampo}
                  />
                  {renderError("sobrenome")}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="usuario"
                  className="text-gray-700 font-semibold"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Digite um e-mail válido"
                  className={getInputClasses(!!formError.usuario)}
                  value={usuario.usuario}
                  onChange={atualizarCampo}
                />
                {renderError("usuario")}
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="foto"
                  className="text-gray-700 font-semibold mb-0"
                >
                  Foto:
                </label>
                <div className="relative">
                  {/* Input do tipo file */}
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/*"
                    className={`block py-2 w-full text-gray-600 
        file:mr-8 file:w-[10px] file:py-2 file:px-0 file:rounded-lg file:border-0 
        file:text-white/0 file:bg-none
        file:transition-all file:cursor-pointer ${getInputClasses(
          !!formError.foto
        )}`}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file); // Armazena o arquivo no estado
                      }
                    }}
                  />

                  {/* Botão estilizado com ícone */}
                  <button
                    type="button"
                    className="absolute left-2 rounded top-1/2 transform -translate-y-1/2 bg-primary-dark rounded-r-none text-white p-3 flex items-center gap-2 hover:bg-gray-400 transition-all"
                    onClick={() => document.getElementById("foto")?.click()} // Força o clique no input
                  >
                    <UploadSimple size={20} />
                  </button>
                </div>

                {/* Exibição do nome do arquivo selecionado */}
                {/* {selectedFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Foto selecionada: {selectedFile.name}
                  </p>
                )} */}
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="senha" className="text-gray-700 font-semibold">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Crie uma senha"
                  className={getInputClasses(!!formError.senha)}
                  value={usuario.senha}
                  onChange={atualizarCampo}
                />
                {renderError("senha")}
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="confirmaSenha"
                  className="text-gray-700 font-semibold"
                >
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmaSenha"
                  name="confirmaSenha"
                  placeholder="Confirme sua senha"
                  className={getInputClasses(!!formError.confirmaSenha)}
                  value={confirmaSenha}
                  onChange={handleConfirmarSenha}
                />
                {renderError("confirmaSenha")}
              </div>
              <button
                type="submit"
                className="rounded bg-neutral-dark hover:bg-neutral text-white w-full py-3 transition-all duration-300"
              >
                Criar Conta
              </button>

              <hr className="border-slate-300 w-full my-4" />

              <p className="text-gray-600 text-center">
                Já tem uma conta?{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Faça login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
