import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_apiKey,
  authDomain: process.env.VUE_APP_FIREBASE_authDomain,
  databaseURL: process.env.VUE_APP_FIREBASE_databaseURL,
  projectId: process.env.VUE_APP_FIREBASE_projectId,
  storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
  appId: process.env.VUE_APP_FIREBASE_appId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function onAuthStateChanged(callback) {
  const unsubscribe = firebase.auth().onAuthStateChanged(() => {
    callback();

    unsubscribe(); // Para ejecutar la inicialización sólo una vez, si no, se ejecuta cada vez que cambia el estado de auth
  });
}
