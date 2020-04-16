import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/original.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Consulta tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        Como escribirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual es tu preferido y comenta
        como ha sido tu experiencia
      </Text>
      <View style={styles.view}>
        <Button
          buttonStyle={styles.btnStyles}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40
  },
  text: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 19,
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  view: {
    flex: 1,
    alignItems: "center"
  },
  btnStyles: {
    backgroundColor: "#00a680"
  },
  btnContainer: {
    width: "70%"
  }
});
