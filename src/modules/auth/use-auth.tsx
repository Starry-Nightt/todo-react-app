import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../configs/firebase";


const useAuth = () => {
  const signUpWithEmail = async (email: string, pwd: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pwd);
    } catch (err) {}
  };

  const signInWithEmail = async (email: string, pwd: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
    } catch (err) {}
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {}
  };

  const signOutAccount = async () => {
    try {
      await signOut(auth);
    } catch (err) {}
  };

  return { signInWithEmail, signInWithGoogle, signOutAccount, signUpWithEmail };
};

export default useAuth;
