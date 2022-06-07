import * as React from "react";
import { Image, StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as SecureStore from "expo-secure-store";

class EditScreen extends React.Component {
  funkcja = null;

  state = {
    title: this.props.route.params.title,
    value: this.props.route.params.value,
    cat: this.props.route.params.cat,
    catArray: [],
  };

  getItems = async () => {
    let result = await SecureStore.getItemAsync("Categories");
    if (result) {
      let categories = JSON.parse(result);
      let categoryArray = [...categories.categories];
      this.setState({ catArray: [...categoryArray] });
    }
  };

  save = async () => {
    let object = {
      value: this.state.value,
      date: this.props.route.params.date,
      color: this.props.route.params.color,
      title: this.state.title,
      cat: this.state.cat,
    };
    await SecureStore.setItemAsync(
      this.props.route.params.key1,
      JSON.stringify(object)
    );
    object["key"] = this.props.route.params.key1;

    this.props.navigation.navigate("Notatki", object);
  };

  componentDidMount() {
    this.getItems();
    this.funkcja = this.props.navigation.addListener("focus", async () => {
      this.setState({
        title: this.props.route.params.title,
        value: this.props.route.params.value,
        cat: this.props.route.params.cat,
      });
      let result = await SecureStore.getItemAsync("Categories");
      if (result) {
        let categories = JSON.parse(result);
        let categoryArray = [...categories.categories];
        this.setState({ catArray: [...categoryArray] });
      }
    });
  }

  render() {
    const categoriesList = this.state.catArray.map((item) => {
      return <Picker.Item label={item} key={item} value={item} />;
    });
    return (
      <View>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="#ff0000"
          value={this.state.title}
          placeholder="Tytuł..."
          onChangeText={(text) => {
            this.setState({ title: text });
          }}
        />
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="#ff0000"
          value={this.state.value}
          placeholder="Treść......"
          onChangeText={(text) => {
            this.setState({ value: text });
          }}
        />
        <Picker
          selectedValue={this.state.cat}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ cat: itemValue });
          }}
        >
          {categoriesList}
        </Picker>
        <Button title="Save" onPress={this.save} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    height: 200,
    width: "100%",
    fontSize: 40,
  },
});

export default EditScreen;
