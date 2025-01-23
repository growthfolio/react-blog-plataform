import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { RotatingLines } from "react-loader-spinner";
import "./Login.css";
import loginVideo from "../../assets/globe-5fdfa9a0f4.mp4";

function getInputClasses(hasError: boolean): string {
  return `border-2 rounded-[12px] rounded-t-none p-3 transition-all outline-none ${
    hasError
      ? "border-red-500 ring-red-500 focus:ring-red-500"
      : "border-slate-700/40 focus:ring-blue-500"
  }`;
}

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [formError, setFormError] = useState({ usuario: "", senha: "" });

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUsuarioLogin({
      ...usuarioLogin,
      [name]: value,
    });

    // Limpa erros ao digitar
    if (value.trim() !== "") {
      setFormError({ ...formError, [name]: "" });
    }
  }

  function validarFormulario() {
    const erros = { usuario: "", senha: "" };
    let isValid = true;

    if (!usuarioLogin.usuario || usuarioLogin.usuario.trim() === "") {
      erros.usuario = "O campo Usuário é obrigatório.";
      isValid = false;
    }

    if (!usuarioLogin.senha || usuarioLogin.senha.trim() === "") {
      erros.senha = "O campo Senha é obrigatório.";
      isValid = false;
    }

    setFormError(erros);
    return isValid;
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validarFormulario()) {
      handleLogin(usuarioLogin);
    }
  }

  return (
    <>
      <div className="grid fundologin grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-gray-200/60">
        <form
          className="flex justify-center items-center flex-col w-3/4 lg:w-1/2 gap-6 bg-white p-8 rounded-lg shadow-lg"
          onSubmit={login}
        >
          <h2 className="text-slate-900 text-4xl lg:text-3xl mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Por favor, insira suas credenciais para continuar.
          </p>

          {/* Campo Usuário */}
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-gray-700 font-semibold">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu usuário ou email"
              className={getInputClasses(!!formError.usuario)}
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
            />
            {formError.usuario && (
              <span className="text-red-500 text-sm mt-1">
                {formError.usuario}
              </span>
            )}
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-gray-700 font-semibold">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className={getInputClasses(!!formError.senha)}
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
            />
            {formError.senha && (
              <span className="text-red-500 text-sm mt-1">
                {formError.senha}
              </span>
            )}
          </div>

          {/* Botão de Login */}
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
              <span>Entrar</span>
            )}
          </button>

          <hr className="border-slate-300 w-full my-4" />

          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="fundoLogin fundoLogin::before hidden lg:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={loginVideo} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className="content">
            <h1>Bem-vindo ao nosso site!</h1>
            <p>Cadastre-se e seja mais</p>
            <a className="cursor-pointer" onClick={() => navigate('/cadastro')}>Cadastrar</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
