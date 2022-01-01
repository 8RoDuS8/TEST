import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import JwtManager from "../../utils/JwtManager";


interface AuthContext {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  signOut: () => void;
}

const initalState: AuthContext = {
  setUser: (user) => user,
  signOut: () => { },
  user: null
}

const Context = createContext<AuthContext>(initalState);


const AuthContextProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<string | null>(initalState.user)


  const signOut = useCallback(() => {
    setUser(null);
    JwtManager.delete();
  }, []);

  return <Context.Provider value={{ user, setUser, signOut }}>
    {children}
  </Context.Provider>


}

export default AuthContextProvider;

const useAuth = () => useContext(Context);

export { useAuth }