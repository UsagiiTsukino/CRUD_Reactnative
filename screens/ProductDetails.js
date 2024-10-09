import { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  Pressable,
  Button,
} from "react-native";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase/firebase.config";
import Dialog from "react-native-dialog";

const UserDetails = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [textName, onChangeNameText] = useState(route.params.item.name);
  const [textPrice, onChangePriceText] = useState(route.params.item.price);
  const [textAvatarLink, onTextAvatarLink] = useState(
    route.params.item.avatar_link
  );
  const [textDescription, onChangeDescriptionText] = useState(
    route.params.item.description
  );

  async function UpdateUser() {
    const ref = doc(db, "product", route.params.item.id);
    await updateDoc(ref, {
      name: textName,
      price: textPrice,
      avatar_link: textAvatarLink,
      description: textDescription,
    })
      .then(() => {
        navigation.navigate("Product List");
      })
      .catch((error) => {
        alert(error.messapp, analytics);
      });
  }
  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    DeleteUser();
    setVisible(false);
  };
  const showConfirmDialog = () => {
    // return Alert.alert(
    //   "Are your sure?",
    //   "Are you sure you want to Delete this User? This action cannot be undone!",
    //   [
    //     {
    //       text: "Yes",
    //       onPress: () => {
    //         DeleteUser();
    //       },
    //     },
    //     {
    //       text: "No",
    //     },
    //   ]
    // );
    setVisible(true);
  };

  async function DeleteUser() {
    const ref = doc(db, "product", route.params.item.id);
    await deleteDoc(ref)
      .then(() => {
        navigation.navigate("Product List");
        alert("Deleted Product Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeNameText}
        value={textName}
        placeholder="Name"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onChangePriceText}
        value={textPrice}
        placeholder="Mail"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onTextAvatarLink}
        value={textAvatarLink}
        placeholder="Phone"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeDescriptionText}
        value={textDescription}
        placeholder="Profile Picture URL"
      />
      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          UpdateUser();
        }}
      >
        <Text>UPDATE USER</Text>
      </Pressable>
      <Pressable
        style={styles.buttonDelete}
        onPress={() => {
          showConfirmDialog();
        }}
      >
        <Text>DELETE USER</Text>
      </Pressable>
      <View style={styles.dialog_container}>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Delete" onPress={handleDelete} />
        </Dialog.Container>
      </View>
    </View>
  );
};

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
  buttonUpdate: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0de065",
  },
  buttonDelete: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    fontWeight: "800",
    backgroundColor: "#f24848",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  dialog_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserDetails;
