import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {
  const { usuario } = useContext(AuthContext);
  const data = new Date().getFullYear();

  let footerComponent;

  if (usuario.token !== '') {
    footerComponent = (
      <div className="flex justify-center bg-primary-dark text-white">
        <div className="container flex flex-col items-center py-6 space-y-4">
          {/* Título e copyright */}
          <p className="text-lg font-bold">
            Blog Pessoal Felipe Macedo | &copy; {data}
          </p>
          <p className="text-sm">Siga-nos nas redes sociais:</p>

          {/* Ícones de redes sociais */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/felipemacedo1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={32} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramLogo size={32} weight="bold" />
            </a>
            <a
              href="https://github.com/growthfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <GithubLogo size={32} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{footerComponent}</>;
}

export default Footer;
