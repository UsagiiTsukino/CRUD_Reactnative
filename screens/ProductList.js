import { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Platform,
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
import { launchImageLibrary } from "react-native-image-picker";
import db from "../firebase/firebase.config";
import emptyList from "../image/ext/rolled_eyes.png";
import formatPrice from "../helpers/formatPrice";
import LogOutIcon from "../assets/logout.webp";
function ProductList({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const isMobile = Platform.OS === "android" || Platform.OS === "ios";
  const user = route.params.user;

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          style={styles.buttonAdd}
          onPress={() => navigation.navigate("Create New Product")}
        >
          <Text style={styles.textButton}>Thêm sản phẩm</Text>
        </Pressable>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: user.avatar_link,
              }}
              style={styles.imagePre}
            />
            <View>
              <Text> Xin chào, </Text>
              <Text>{user.name}</Text>
            </View>
            <View>
              <Pressable style={styles.buttonLogOut}>
                <Image
                  source={{
                    uri: "../assets/logout.webp",
                  }}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

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
              <Text style={styles.itemMail}>{formatPrice(item.price)} VNĐ</Text>
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
  buttonLogOut: {
    alignItems: "center",
    justifyContent: "center",
    // elevation: 3,
    padding: 2,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default ProductList;
