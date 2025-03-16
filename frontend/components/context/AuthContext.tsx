import { createContext, useState, useContext } from "react";

interface AuthInformation {
  username: string;
  password: string;
  email: string;
  token: string;
}

interface AuthContextProps {
  authInfo: AuthInformation;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInformation>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [authInfo, setAuthInfo] = useState<AuthInformation>({
        username: "",
        password: "",
        email: "",
        token: "",
    });
    return (
        <AuthContext.Provider value={{authInfo, setAuthInfo}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext need to be used in AuthProvider");
    }
    return context;
}