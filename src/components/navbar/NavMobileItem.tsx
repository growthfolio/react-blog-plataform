import { useNavigate } from "react-router-dom";
import { useNavMobileContext } from "../../contexts/NavMobileContext";

type Props = {
  children: React.ReactNode;
  to: string;
};

export function NavMobileItem({ to, children }: Props) {
  const navigate = useNavigate();
  const { setIsVisible } = useNavMobileContext();

  function handleButtonClick() {
    navigate(to);
    setIsVisible(false);
  }

  return (
    <button
      className="w-full px-6 pt-4 pb-1 border-b border-l border-primary-light
        text-gray-200 text-lg font-medium
        flex items-center gap-4
        rounded-lg rounded-t-none rounded-r-none hover:bg-blue-700/30 hover:border-blue-400
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring focus:ring-blue-500/50
        active:scale-95"
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
}
