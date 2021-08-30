import React from 'react';
import firebase from 'firebase';
import {
  createContext,
  useContext,
  useState
} from 'react';
import { auth } from '../services/firebase';

type ChildrenProps = {
  children: React.ReactNode;
}

type User = {
  id: string;
  name: string;
  email: string | null;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

export function AppWrapper({ children }: ChildrenProps) : JSX.Element {
  const [user, setUser] = useState<User>();

  async function signInWithGoogle() : Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      //TODO: Save in database
    if (result.user) {
      const { displayName, email, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        email: email,
        avatar: photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAppContext() : AuthContextType {
  return useContext(AuthContext);
}