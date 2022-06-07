import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Button,
  TouchableHighlight,
  TextInput,
} from "react-native";
import * as SecureStore from "expo-secure-store";

const Item = ({ title, value, date, color, changeItem, cat, key1, nav }) => {
  const deleteItem = async (klucz) => {
    let res = await SecureStore.getItemAsync(klucz);

    await SecureStore.deleteItemAsync(klucz);
    let result = await SecureStore.getItemAsync("AllValues");

    let newResult = JSON.parse(result);
    let newResult2 = newResult.keys.filter((item) => {
      return item != klucz;
    });

    //console.log("BBBB", result, "AAAA");
    await SecureStore.setItemAsync(
      "AllValues",
      JSON.stringify({ keys: newResult2 })
    );
    changeItem(klucz);
  };

  const longPress = (title1) => {
    Alert.alert("Usuwanie Notatki", "Czy usunąć?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteItem(title1) },
    ]);
  };

  const EditNote = () => {
    nav.navigate("edit", { cat, title, value, key1, color, date });
  };

  return (
    <View style={[styles.title, { backgroundColor: color }]}>
      <TouchableHighlight
        onLongPress={() => longPress(key1)}
        onPress={EditNote}
      >
        <View>
          <View style={{ backgroundColor: "black" }}>
            <Text style={{ fontSize: 23, textAlign: "left", color: "white" }}>
              {cat}
            </Text>
          </View>
          <Text style={{ fontSize: 23, textAlign: "right" }}>{date}</Text>
          <Text style={{ fontSize: 32 }}>{title}</Text>
          <Text>{value}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

class S1 extends React.Component {
  // const [data, setData] = React.useState([]);
  constructor(props) {
    super(props);
    this.funkcja = null;
  }
  state = {
    data: [],
    value: "",
  };

  componentDidMount() {
    this.show();
    //console.log(this.props.navigation , "ASD")
    this.funkcja = this.props.navigation.addListener("focus", () => {
      // const {value , date , color, title , cat , key} = this.props.route.params
      if (this.props.route.params != undefined) {
        const copyArr = [...this.state.data];
        let object = {
          value: this.props.route.params.value,
          date: this.props.route.params.date,
          color: this.props.route.params.color,
          key: this.props.route.params.key,
          title: this.props.route.params.title,
          cat: this.props.route.params.cat,
        };
        let isKey = false;
        this.state.data.forEach((item, index) => {
          if (item.key == this.props.route.params.key) {
            copyArr[index] = object;
            isKey = true;
          }
        });
        if (!isKey) {
          copyArr.unshift(object);
        }
        this.setState({ data: [...copyArr] });
      } else {
        this.refresh();
      }
    });

    this.refresh();
  }

  refresh = () => {
    this.show();
  };

  componentWillUnmount() {
    this.funkcja();
  }

  changeGlobal = (klucz) => {
    const newArray = this.state.data.filter((item) => {
      if (item.key != klucz) {
        return item;
      }
    });
    this.setState({ data: [...newArray] });
  };

  setText = (text) => {
    this.setState({ value: text });
  };

  show = async () => {
    let result = await SecureStore.getItemAsync("AllValues");
    if (result) {
      const copyArr = [];
      let AfterParse = JSON.parse(result);
      //console.log(AfterParse)
      let arrayKeys = [...AfterParse.keys];
      //console.log("AAA")
      arrayKeys.forEach(async (item) => {
        let itemek = await SecureStore.getItemAsync(item);
        let noteobj = JSON.parse(itemek);
        //console.log(noteobj)
        copyArr.unshift({
          value: noteobj.value,
          date: noteobj.date,
          color: noteobj.color,
          key: item,
          title: noteobj.title,
          cat: noteobj.cat,
        });
        this.setState({ data: [...copyArr] });
      });
    }
  };

  render() {
    const { value } = this.state;

    const arrayToDisplay = this.state.data.filter((item) => {
      if (
        item.title.includes(value) ||
        item.cat.includes(value) ||
        item.value.includes(value)
      ) {
        return item;
      }
    });
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          placeholder="szukaj..."
          value={this.state.value}
          onChangeText={(text) => this.setText(text)}
        />
        <FlatList
          style={styles.item}
          numColumns={2}
          data={arrayToDisplay}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              value={item.value}
              date={item.date}
              color={item.color}
              key1={item.key}
              cat={item.cat}
              changeItem={this.changeGlobal}
              nav={this.props.navigation}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaaaaa",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    // flex: 1,
    width: "90%",
    backgroundColor: "#aaaaaa",
  },
  title: {
    fontSize: 32,
    width: "40%",
    height: "auto",
    margin: 15,
  },
  txtInput: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
  },
});

export default S1;
