import React, { useState } from "react";
import { View } from 'react-native';
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";
import { withNavigation } from 'react-navigation';

function LoginFb(props) {
const { toastRef, navigation } = props;
const [isVisibleLoading, setIsvisibleLoading] = useState(false);

const login = async()=>{
  setIsvisibleLoading(true)
  Facebook.initializeAsync(FacebookApi.application_id);
  const {type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions,
  });

  if(type == "success") {
    const credentials = firebase.auth.FacebookAuthProvider.credential(token);
    await firebase
    .auth()
    .signInWithCredential(credentials)
    .then(()=> {
      navigation.navigate("MyAccount");
    })
    .catch(() =>  toastRef.current.show("Error accediendo con Facebook, intentelo mas tarde"));
  } else if(type == "cancel"){
    toastRef.current.show("Has cancelado el inicio de sesion con Facebook");
  } else {
    toastRef.current.show("Error desconocido, intente mas tarde");;
  }
  setIsvisibleLoading(false)
};

  return (
    <>
    <SocialIcon
      title="Iniciar sesion con facebook"
      button
      type="facebook"
      onPress={login}
    />
    <Loading text="Iniciando sesion" isVisible={isVisibleLoading} />
    </>
  );
}


export default withNavigation(LoginFb);

