import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../Components/Logo";
import Header from "../Components/Header";
import TextInput from "../Components/TextInput";
import Background from "../Components/Background";
import Button from "../Components/Button";

// import http from "../utils/http";

function Login({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [error, setError] = useState(false);

  const onLoginPressed = async () => {};
  return (
    <Background>
      <Logo />
      <Header>ULibs Chào bạn !</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => {
          setEmail({ value: text, error: "" });
          setError(false);
        }}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {error && (
        <Text style={{ color: "red" }}>
          * Tài khoản, mật khẩu hoặc email có thể không đúng. Xin hãy nhập lại
        </Text>
      )}
      <TextInput
        label="Tên đăng nhập"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => {
          setUsername({ value: text, error: "" });
          setError(false);
        }}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => {
          setPassword({ value: text, error: "" });
          setError(false);
        }}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Đăng nhập
      </Button>
      <View style={styles.row}>
        <Text>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Đăng kí tại đây</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: "#414757",
  },
  link: {
    fontWeight: "bold",
    color: "#560CCE",
  },
});
export default Login;
