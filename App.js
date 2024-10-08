import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/ProductList";
import CreateNewProduct from "./screens/CreateNewProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen
          name="Product List"
          component={HomeScreen}
          options={{ title: "Product List" }}
        />
        <Stack.Screen
          name="Create New Product"
          component={CreateNewProduct}
          options={{ title: "Create New Product" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
