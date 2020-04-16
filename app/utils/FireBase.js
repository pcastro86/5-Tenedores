import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "*********************",
  authDomain: "tenedores-eede3.firebaseapp.com",
  databaseURL: "https://tenedores-eede3.firebaseio.com",
  projectId: "tenedores-eede3",
  storageBucket: "**********",
  messagingSenderId: "********",
  appId: "****************"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);