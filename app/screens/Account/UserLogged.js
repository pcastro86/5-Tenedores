import React, {useEffect, useState } from 'react';
import { View, Text } from "react-native";
import {Button} from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged(){
  const [infoUser, setInfoUser] = useState({})

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setInfoUser(user.providerData[0])
    })();
    return () => {
      cleanup
    }
  }, [])
  return (
    <View>
    <InfoUser userInfo={infoUser}/>
    <Button title="cerrar sesion" onPress={() => firebase.auth().signOut()} />
    </View>
  )
}