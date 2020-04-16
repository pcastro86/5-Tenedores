import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_6W7iW1NVL0uNVa6uLBMRZICKOG57m98",
  authDomain: "tenedores-eede3.firebaseapp.com",
  databaseURL: "https://tenedores-eede3.firebaseio.com",
  projectId: "tenedores-eede3",
  storageBucket: "tenedores-eede3.appspot.com",
  messagingSenderId: "10804437339",
  appId: "1:10804437339:web:0f905d0793031274f4ba7e"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);