import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const addCategory = async () => {
    let result = await SecureStore.getItemAsync("Categories");
    let object = {};
    if (result) {
      let obj = JSON.parse(result);
      let array = [...obj.categories];
      array.push(category);
      object = { categories: array };
    } else {
      object = { categories: ["Ogólne", category] };
    }
    setCategory("");
    await SecureStore.setItemAsync("Categories", JSON.stringify(object));
    let result1 = await SecureStore.getItemAsync("Categories");
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        underlineColorAndroid="#ff0000"
        value={category}
        placeholder="Kategoria"
        onChangeText={(text) => setCategory(text)}
      />
      <Button
        title="Save"
        onPress={() => {
          // saveItem(key,value);
          addCategory();
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

export default AddCategory;
