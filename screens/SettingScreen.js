import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [password, setPassword] = useState("");

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paramètres</Text>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </TouchableOpacity>

      <View style={styles.option}>
        <Text style={styles.optionText}>Language</Text>
        <Picker
          style={styles.languagePicker}
          selectedValue={language}
          onValueChange={handleChangeLanguage}
        >
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="English" value="en" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Change Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="New Password"
          value={password}
          onChangeText={handleChangePassword}
          secureTextEntry
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    fontSize: 16,
  },
  languagePicker: {
    width: 150,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SettingsScreen;
