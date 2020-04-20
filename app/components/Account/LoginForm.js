import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import * as firebase from "firebase";

function LoginForm(props) {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isVisibleLoading, setIsvisibleLoading] = useState(false);
  const { toastRef, navigation } = props;


  const login = async () => {
    setIsvisibleLoading(true);
    if (!email || !pass) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("La direccion de email no es correcta");
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, pass)
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show("Email o Password incorrecta");
          });
      }
    }
    setIsvisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contrasena"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={hidePass}
        onChange={e => setPass(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePass ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePass(!hidePass)}
          />
        }
      />

      <Button
        title="Iniciar sesion"
        containerStyle={styles.containerBtnForm}
        buttonStyle={styles.btnForm}
        onPress={login}
      />
      <Loading text="Iniciando sesion" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  containerBtnForm: {
    marginTop: 20,
    width: "95%"
  },
  btnForm: {
    backgroundColor: "#00a680"
  }
});
