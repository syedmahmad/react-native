import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlelogin = async () => {
    const res = await AsyncStorage.getItem("data");
    const data = JSON.parse(res);
    // console.warn("data", data[0]);
    if (data[0].email === email && data[0].password === password) {
      navigation.navigate("Home", { data: data });
    } else {
      alert(`Email : ${email} or Password : ${password} is not correct`);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginVertical: 30 }}>Login Page</Text>
        <TextInput
          style={{
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            padding: 10
          }}
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          style={{
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            marginBottom: 20,
            padding: 10
          }}
          placeholder="Password"
          onChangeText={(e) => setPassword(e)}
        />
        <Button title="Login" onPress={handlelogin} />
        <Text
          style={{
            fontSize: 17,
            marginTop: 10,
            marginBottom: 20,
            color: "blue",
          }}
        >
          Not Have An Account
        </Text>
        <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
      </View>
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
