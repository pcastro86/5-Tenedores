import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";


export default function LoginFb(props) {
  const login = async()=>{
    Facebook.initializeAsync(FacebookApi.Aplication_ID);
    const {type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: FacebookApi.permissions,
    });
    console.log(type);
};
/*   const login = async () => {
    Facebook.initializeAsync(FacebookApi.Aplication_ID);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );

    console.log(type)
  }; */

  return (
    <SocialIcon
      title="Iniciar sesion con facebook"
      button
      type="facebook"
      onPress={login}
    />
  );
}
