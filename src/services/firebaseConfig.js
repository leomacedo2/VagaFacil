import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase, lida a partir de variáveis de ambiente (.env).
// Nenhuma credencial fica hardcoded no código-fonte — veja o .env.example
// na raiz do projeto para a lista completa de variáveis necessárias.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.warn(
    "Firebase não configurado: verifique se o arquivo .env possui as variáveis VITE_FIREBASE_*. " +
      "Login, cadastro e reservas não vão funcionar até que isso seja configurado."
  );
}

// Evita reinicializar o app em hot-reload (Vite/HMR).
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
