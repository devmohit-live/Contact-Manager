import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Card } from "native-base";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  static navigatioOptions = {
    title: "Contact App"
  };
  getAllContact = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        //console.log(keys);
        return AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState({
              data: result.sort(function(a, b) {
                if (JSON.parse(a[1]).firstname < JSON.parse(b[1]).firstname) {
                  return -1;
                }
                if (JSON.parse(a[1]).firstname > JSON.parse(b[1]).firstname) {
                  return 1;
                }
                return 0;
              })
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getAllContact();
    });
    console.log(this.state.data);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => {
            this.props.navigation.navigate("AddNewContact");
          }}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});
