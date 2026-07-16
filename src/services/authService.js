import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Serviço responsável por toda comunicação com o Firebase Authentication.
// Nenhum componente deve chamar o SDK do Firebase diretamente — apenas
// este service (mesmo padrão de geocodingService/parkingService).

const ERROR_MESSAGES = {
  "auth/email-already-in-use": "Este e-mail já está cadastrado.",
  "auth/invalid-email": "Informe um e-mail válido.",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/too-many-requests": "Muitas tentativas. Tente novamente em instantes.",
};

function translateAuthError(error) {
  return ERROR_MESSAGES[error?.code] || "Não foi possível concluir a operação. Tente novamente.";
}

/** Cria uma nova conta com nome, e-mail e senha. */
export async function signUp(name, email, password) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }
    return credential.user;
  } catch (error) {
    throw new Error(translateAuthError(error));
  }
}

/** Autentica um usuário existente com e-mail e senha. */
export async function signIn(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (error) {
    throw new Error(translateAuthError(error));
  }
}

/** Encerra a sessão do usuário atual. */
export function logout() {
  return signOut(auth);
}

/** Assina mudanças no estado de autenticação (login/logout). */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

export default {
  signUp,
  signIn,
  logout,
  subscribeToAuthChanges,
};
