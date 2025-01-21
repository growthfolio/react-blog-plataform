import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { HamburguerIcon, NavMobileItem } from "./index.tsx";
import { useNavMobileContext } from "../../contexts/NavMobileContext.tsx";
import { X } from "@phosphor-icons/react";
import { toastAlerta } from "../../util/toastAlerta.ts";

function Navbar() {
  const navigate = useNavigate();
  const { isVisible, setIsVisible } = useNavMobileContext();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    toastAlerta("Usuário deslogado com sucesso", "sucesso");
    navigate("/login");
  }

  let navbarComponent;

  if (usuario.token !== "") {
    navbarComponent = (
      <>
        {/* Navbar principal */}
        <div className="w-full bg-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="text-2xl font-bold uppercase">
              Blog Pessoal
            </Link>

            {/* Links desktop */}
            <div className="hidden md:flex gap-8">
              <Link to="/postagens" className="hover:underline">
                Postagens
              </Link>
              <Link to="/temas" className="hover:underline">
                Temas
              </Link>
              <Link to="/cadastroTema" className="hover:underline">
                Cadastrar tema
              </Link>
              <Link to="/perfil" className="hover:underline">
                Perfil
              </Link>
              <button onClick={logout} className="hover:underline">
                Sair
              </button>
            </div>

            {/* Botão de menu mobile */}
            <div className="flex md:hidden items-center">
              <button onClick={() => setIsVisible((prev) => !prev)}>
                {isVisible ? (
                  <X size={32} className="text-white" />
                ) : (
                  <HamburguerIcon />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isVisible && (
          <div
            className={`w-full h-[calc(100vh-81px)] fixed top-14 right-0 bg-primary-dark border-t border-blue-600/80 z-50 transition-transform transform ease-in-out duration-300 ${
              isVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col items-stretch gap-4 px-6 py-4">
              <NavMobileItem to="/postagens">Postagens</NavMobileItem>
              <NavMobileItem to="/temas">Temas</NavMobileItem>
              <NavMobileItem to="/cadastroTema">Cadastrar tema</NavMobileItem>
              <NavMobileItem to="/perfil">Perfil</NavMobileItem>
              <button
                onClick={logout}
                className="w-full text-left py-3 px-4 text-lg text-white hover:bg-blue-600/20 rounded transition duration-200"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{navbarComponent}</>;
}

export default Navbar;
