import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Button,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firebase.config";
import { launchImageLibrary } from "react-native-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { user } from "./Login";

export default function CreateNewProduct({ navigation }) {
  const [textName, onChangeNameText] = useState("");
  const [textPrice, onChangePriceText] = useState("");
  const [textDescription, onChangeDescriptionText] = useState("");
  const storage = getStorage();
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    });

    if (!result.didCancel && result.assets) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadImageToFirebase(uri);
    }
  };

  const uploadImageToFirebase = async (uri) => {
    try {
      // Tạo một ID ngẫu nhiên hoặc tên tệp cho hình ảnh
      const imageName = `images/${Date.now()}.jpg`;
      const storageRef = ref(storage, imageName);

      // Fetch image data from the uri
      const response = await fetch(uri);
      const blob = await response.blob();

      // Upload image
      await uploadBytes(storageRef, blob);

      // Lấy URL tải xuống
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      console.log("Image URL: ", url); // In URL để kiểm tra
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };
  async function AddProduct() {
    await addDoc(collection(db, "product"), {
      name: textName,
      price: textPrice,
      avatar_link: imageUrl,
      description: textDescription,
    })
      .then(() => {
        navigation.navigate("Product List", { user });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function ButtonSave() {
    if (
      textName.length === 0 ||
      textPrice.length === 0 ||
      textDescription.length === 0
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Select Image" onPress={selectImage} />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 100,
              height: 150,
              paddingTop: 30,
              paddingBottom: 30,
              marginTop: 20,
              marginBottom: 20,
              resize: "contain",
            }}
          />
        )}
        {imageUrl ? <Text>Image URL: {imageUrl}</Text> : null}
      </View>
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
