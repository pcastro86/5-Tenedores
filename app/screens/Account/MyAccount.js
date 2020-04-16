import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Loading from '../../components/Loading';
import UserGuest from "../Account/UserGuest";
import UserLogged from "../Account/UserLogged";
import * as firebase from "firebase";

export default function MyAccount() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login == null) {
    return (
      <Loading isVisible={true} text="Cargando" />
    );
  }

  return login ? <UserLogged /> : <UserGuest />


}
