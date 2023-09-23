import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../configs/firebase";
import { useCallback } from "react";


const useAuth = () => {
  const signUpWithEmail = useCallback(async (email: string, pwd: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pwd);
    } catch (err) {
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, pwd: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
    } catch (err) {}
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {}
  }, []);

  const signOutAccount = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (err) {}
  }, []);

  return { signInWithEmail, signInWithGoogle, signOutAccount, signUpWithEmail };
};

export default useAuth;
