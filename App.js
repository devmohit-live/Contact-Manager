import HomeScreen from "./screens/HomeScreen";
import EditContactScreen from "./screens/EditContactScreen";
import AddNewContactScreen from "./screens/AddNewContactScreen";
import ViewContactScreen from "./screens/ViewContactScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    AddNewContact: { screen: AddNewContactScreen },
    ViewContact: { screen: ViewContactScreen },
    EditContact: { screen: EditContactScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#b83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
