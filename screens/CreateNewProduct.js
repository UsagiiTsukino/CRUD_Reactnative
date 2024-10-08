import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firebase.config";

export default function CreateNewProduct({ navigation }) {
  const [textName, onChangeNameText] = useState("");
  const [textPrice, onChangePriceText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const [textAvatarLink, onChangeAvatarLinkText] = useState("");

  async function AddProduct() {
    await addDoc(collection(db, "product"), {
      name: textName,
      price: textPrice,
      avatar_link: textAvatarLink,
      description: textDescription,
    })
      .then(() => {
        navigation.navigate("Product List");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function ButtonSave() {
    if (
      textName.length === 0 ||
      textPrice.length === 0 ||
      textDescription.length === 0 ||
      textAvatarLink.length === 0
    ) {
      alert("All the fields are required");
      return;
    }
    AddProduct();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeNameText}
        value={textName}
        placeholder="Product Name"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeAvatarLinkText}
        value={textAvatarLink}
        placeholder="Product Avatar Link"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onChangePriceText}
        value={textPrice}
        placeholder="Product Price"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeDescriptionText}
        value={textDescription}
        placeholder="Product Description"
      />
      <Pressable style={styles.buttonSave} onPress={() => ButtonSave()}>
        <Text style={styles.textButton}>Save</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonSave: {
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#1ecfea",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
