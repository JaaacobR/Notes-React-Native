import React, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";

const months = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paz",
  "Lis",
  "Gru",
];
const characters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const S2 = (props) => {
  const [value, setValue] = React.useState("");
  const [key, setKey] = React.useState("");
  const [actualValues, setActualValues] = React.useState([]);
  const [cat, setCat] = React.useState("");
  const [catArray, setCatArray] = useState(["Ogólne"]);
  let funkcja = null;

  async function show(key1, value1) {
    const d = new Date();
    let month = months[d.getMonth()];
    let day =
      d.getDate().toString().length < 2
        ? `0${d.getDate().toString()}`
        : d.getDate().toString();
    let fullDate = ` ${day} ${month}`;
    let valueReady = value1 + fullDate;
    let color = "#";
    let klucz = (Math.random() * 9999).toString();
    for (let i = 0; i <= 5; i++) {
      color += characters[Math.floor(Math.random() * 16)];
    }
    valueReady = JSON.stringify({
      value: value1,
      date: fullDate,
      color,
      title: key1,
      cat,
    });
    await SecureStore.setItemAsync(klucz, valueReady);

    let result = await SecureStore.getItemAsync("AllValues");
    if (result) {
      let arrayKeys = JSON.parse(result);

      let keysList = [...arrayKeys.keys];
      keysList.unshift(klucz);
      await SecureStore.setItemAsync(
        "AllValues",
        JSON.stringify({ keys: keysList })
      );
      props.navigation.navigate("Notatki", {
        value: value1,
        date: fullDate,
        color,
        title: key1,
        cat,
        key: klucz,
      });
    } else {
      await SecureStore.setItemAsync(
        "AllValues",
        JSON.stringify({ keys: [klucz] })
      );
    }
  }

  useEffect(async () => {
    funkcja = props.navigation.addListener("focus", () => {
      refresh();
    });
    let result = await SecureStore.getItemAsync("Categories");
    if (result) {
      let categories = JSON.parse(result);
      let categoryArray = [...categories.categories];
      setCatArray([...categoryArray]);
      setCat(categoryArray[0]);
    }

    return () => {
      funkcja;
    };
  }, []);

  const refresh = async () => {
    let result = await SecureStore.getItemAsync("Categories");
    if (result) {
      let categories = JSON.parse(result);
      let categoryArray = [...categories.categories];
      let newObjects = [];
      categoryArray.forEach((item) => {
        if (!catArray.includes(item)) {
          newObjects.push(item);
        }
      });
      setCatArray([...catArray].concat(newObjects));
    }
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        underlineColorAndroid="#ff0000"
        value={key}
        placeholder="Tytuł..."
        onChangeText={(text) => setKey(text)}
      />
      <TextInput
        style={styles.textInput}
        underlineColorAndroid="#ff0000"
        value={value}
        placeholder="Treść......"
        onChangeText={(text) => setValue(text)}
      />
      <Picker
        selectedValue={cat}
        onValueChange={(itemValue, itemIndex) => {
          setCat(itemValue);
        }}
      >
        {catArray.map((item) => {
          return <Picker.Item label={item} key={item} value={item} />;
        })}
      </Picker>
      <Button
        title="Save"
        onPress={() => {
          // saveItem(key,value);
          show(key, value);

          setKey("");
          setValue("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 200,
    width: "100%",
    fontSize: 40,
  },
});

export default S2;
