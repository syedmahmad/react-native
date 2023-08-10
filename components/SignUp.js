import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const data = [{
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  }];
  // console.log(data);
  const handlePress = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("data", jsonValue);
      alert('Register Successfully');
      navigation.navigate('Login');
    } catch (error) {
      // console.error("Error storing data: ", error);
      alert('Something went wrong. Please try again.', error);
    }

  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginVertical: 30, }}>Sign Up Page</Text>
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          padding: 10
        }}
        placeholder="First Name"
        onChangeText={(e) => setFirstName(e)}
      />
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          padding: 10
        }}
        placeholder="Last Name"
        onChangeText={(e) => setLastName(e)}
      />
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
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
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          padding: 10
        }}
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
      />
      <Button title="SignUp" onPress={handlePress} />
    </View>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
