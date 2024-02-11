import {INavMobileContext} from "../interfaces/INavMobileContext";
import { createContext, useContext, useState } from "react";

const NavMobileContext = createContext<INavMobileContext>(null!);

export function NavMobileProvider({children}: {children: React.ReactNode}) {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <NavMobileContext.Provider value={{isVisible, setIsVisible}}>
            {children}
        </NavMobileContext.Provider>
    )
}

export function useNavMobileContext(){
    return useContext(NavMobileContext);
}