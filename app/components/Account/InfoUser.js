import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo, // SE LO LLAMA DOS VECES. EN ESTADO NORMAL Y CON EL DESTRUCTURING
    userInfo: { photoURL, uid, displayName, email } // DOBLE DESTRUCTURING : SACO DE ESE EOBJETO LO QUE NECESITO
  } = props;

  const changeAvatar = async () => {
    // funcion para cambiar el avatar
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      console.log("es necesario aceptar las imagenes");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        console.log("has cerrado la galeria de imagenes");
      } else {
        uploadImage(result.uri, uid).then(() => {
          console.log('Imagen subida correctamente');
          updateImage(uid)
        });
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    const response = await fetch(uri); // hago un fecth a la url de la imagen
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`); // quiero guardar mi imagen en avatar

    return ref.put(blob);
  };


  const updateImage = uid => { //obtengo la imagen a traves de uid
    firebase.storage().ref(`avatar/${uid}`) // busco la imagen en el storage
    .getDownloadURL()
    .then(async result => {
      const update = {
        photoURL : result
      }
      await firebase
        .auth()
        .currentUser
        .updateProfile(update);
    } ).catch(() => console.log("error al recuperar la imagen"))
  }

  return (
    <View style={styles.viewUserInfor}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://avatars.dicebear.com/v2/human/seed.svg"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text style={styles.displayEmail}>
          {email ? email : "Social Login"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfor: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  },
  displayEmail: {}
});
