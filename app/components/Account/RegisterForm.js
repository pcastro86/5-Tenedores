import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import Loading from "../Loading";
import {withNavigation} from "react-navigation"

function RegisterForm(props) {
  const {toastRef, navigation } = props;
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConfirm, setHidePassConfirm] = useState(true);
  const [saveEmail, setSaveEmail] = useState("");
  const [savePass, setSavePass] = useState("");
  const [savePassConfirm, setSavePassConfirm] = useState("");
  const [ isVisibleLoading, setIsvisibleLoading] = useState(false)

  const register = async () => {
    setIsvisibleLoading(true)
    if (!saveEmail || !savePass || !savePassConfirm) {
      toastRef.current.show("Todos los campos son obligatorios")
    } else {
      if (!validateEmail(saveEmail)) {
        toastRef.current.show("La direccion de correo no es valida")
      } else {
        if (savePass !== savePassConfirm) {
          toastRef.current.show("Las contrasenas deben ser iguales")
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(saveEmail, savePass)
            .then(() => {
              navigation.navigate("MyAccount")
            })
            .catch(() => {
              toastRef.current.show("Error al crear la cuenta")
            });
        }
      }
    }
    setIsvisibleLoading(false)
  };

  return (
    <View style={styles.formContainer} behavior="padding" enable>
      <Input
        placeholder="correo electronico"
        containerStyle={styles.inputForm}
        onChange={e => setSaveEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder="contrasena"
        password={true}
        secureTextEntry={hidePass}
        containerStyle={styles.inputForm}
        onChange={e => setSavePass(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePass ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={() => setHidePass(!hidePass)}
          />
        }
      />
      <Input
        placeholder="repetir contrasena"
        password={true}
        secureTextEntry={hidePassConfirm}
        containerStyle={styles.inputForm}
        onChange={e => setSavePassConfirm(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassConfirm ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={() => setHidePassConfirm(!hidePassConfirm)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
    <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

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
  icon: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%"
  },
  btnRegister: {
    backgroundColor: "#00a680"
  }
});
