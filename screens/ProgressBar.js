import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]}>
        <Text style={{paddingLeft : '10%', color:'white', fontWeight : 'bold'}}>{progress * 100}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0782F9",
  },
});

export default ProgressBar;
