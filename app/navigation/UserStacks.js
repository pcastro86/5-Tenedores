
import { createStackNavigator } from "react-navigation-stack";
import UserScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login"
import RegisterScreen from "../screens/Account/Register";

const UserScreenStacks = createStackNavigator({
  MyAccount: {
    screen: UserScreen,
    navigationOptions: () => ({
      title: "Mi cuenta"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro"
    })
  }
});

export default UserScreenStacks;