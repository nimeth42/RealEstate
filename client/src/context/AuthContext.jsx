import { Children, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
const [currentUser, setCurrentUser] = userState(
    JSON.parse(localStorage.getItem("user")) || null
);

    return(
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};


