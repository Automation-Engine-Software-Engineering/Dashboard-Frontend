import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  auth?: {
    user?: any;
    password?: string;
    roles?: number[] | string[];
    accessToken?: string;
  };
  setAuth?: React.Dispatch<React.SetStateAction<AuthContextType["auth"]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType["auth"]>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  return { ...auth };
};

export { AuthContext, AuthProvider, useAuth };
