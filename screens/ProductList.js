import { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  collection,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import db from "../firebase/firebase.config";
import emptyList from "../image/ext/rolled_eyes.png";
function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "product");
    onSnapshot(colRef, (QuerySnapshot) => {
      const products = [];
      QuerySnapshot.forEach((doc) => {
        const { name, price, avatar_link, description } = doc.data();
        products.push({
          id: doc.id,
          name,
          price,
          avatar_link,
          description,
        });
      });
      setProducts(products);
    });
  }, []);

  return (
    <View>
      <Pressable
        style={styles.buttonAdd}
        onPress={() => navigation.navigate("Create New Product")}
      >
        <Text style={styles.textButton}>CREATE USER</Text>
      </Pressable>
      <FlatList
        style={{ height: "100%" }}
        data={products}
        numColumn={1}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontWeight: "400" }}>Nothing to see here :/</Text>
            <Image
              source={emptyList}
              style={{ width: 100, height: 100, marginTop: 30 }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("Product Details", { item })}
          >
            <View>
              <Image
                source={{
                  uri: item.avatar_link,
                }}
                style={styles.imagePre}
              />
            </View>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMail}>{item.price}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  empty: {
    padding: 100,
    display: "flex",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#1ecfea",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  imagePre: {
    width: 50,
    height: 50,
    margin: 5,
    resizeMode: "contain",
    borderRadius: 50 / 2,
    marginRight: 20,
  },
  itemName: {
    fontWeight: "bold",
  },
  itemMail: {
    fontWeight: "300",
  },
});
export default ProductList;
