import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from "react-native";

const Home = ({ route, navigation }) => {
    const { data } = route.params;
    const name = data[0].firstName;
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Load tasks from AsyncStorage when the component mounts
        loadTasks();
    }, []);

    const handleLogout = () => {
        navigation.navigate("Login");
    }

    const addTask = () => {
        if (text.trim()) {
            // Create a new task with a unique ID
            const newTask = {
                id: Date.now().toString(),
                text: text
            };

            // Update the tasks list
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);

            // Save the updated tasks list to AsyncStorage
            saveTasks(updatedTasks);

            // Clear the input field
            setText("");
        }
    };

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem("tasks");
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error("Error loading tasks from AsyncStorage:", error);
        }
    };

    const saveTasks = async (tasksToSave) => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(tasksToSave));
        } catch (error) {
            console.error("Error saving tasks to AsyncStorage:", error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginVertical: 30 }}>Todo App</Text>
                <Text style={{ fontSize: 20, marginVertical: 0, marginBottom: 60 }}>Welcome {name}</Text>
                <TextInput
                    style={{
                        height: 40,
                        width: '80%',
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10,
                        padding: 10
                    }}
                    placeholder="Enter a task"
                    onChangeText={(e) => setText(e)}
                    value={text}
                />
                {/* <Button title="Add Task" onPress={addTask} />
                {tasks.map(task => (
                    <Text key={task.id}>{task.text}style={styles.taskText} > </Text>
                ))} */}
                <Button title="Add Task" onPress={addTask} />
                {tasks.map(task => (
                    <Text key={task.id} style={styles.taskText}>
                        {task.text}
                    </Text>
                ))}

                <View style={styles.logoutButtonContainer}>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </View>
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
    },
    logoutButtonContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    taskText: {
        fontSize: 18, 
        marginVertical: 5,
        color:'#2e2e2e'
    },
});
