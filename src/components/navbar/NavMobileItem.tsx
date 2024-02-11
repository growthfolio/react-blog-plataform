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
    return <button className='w-full p-4 border-b border-blue-500/80
       hover:border-gray-100/50 text-gray-100 text-lg
       flex items-start 
       rounded-bl-lg 
        active:bg-blue-600/20 active:transition-shadow
        active:duration-300
        active:ease-out active:shadow-lg active:shadow-gray-100/10
        transition duration-200 ease-in-out'
        onClick={handleButtonClick}>
        {children}
    </button>;

}
