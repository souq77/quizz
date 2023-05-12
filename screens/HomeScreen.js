import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import data from "../asset/data.json";
import Swiper from "react-native-swiper/src";
import { LineChart } from "react-native-chart-kit";

let itemList = [];

const HomeScreen = () => {
  const navigation = useNavigation();

  console.log(data.languages.length);
  return (
    <>
      <View style={styles.header}>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: "#f2f2f2",
            backgroundGradientFrom: "#f2f2f2",
            backgroundGradientTo: "#f2f2f2",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(7, 130, 249, ${opacity})`, // Couleur principale du graphique
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6", // Taille des points du graphique
              strokeWidth: "2",
              stroke: "white", // Couleur des points du graphique
            },
          }}
          bezier
        />
      </View>
      <View style={styles.container}>
        <Swiper>
          <View style={styles.parentGrid}>
            <Pressable
              onPress={() => navigation.navigate("Options", { theme: "linux" })}
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/linux.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>Linux</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Options", { theme: "bash" })}
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/bash.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>BASH</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Options", { theme: "php" })}
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/php.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>PHP</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Options", { theme: "docker" })
              }
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/docker.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>Docker</Text>
            </Pressable>
          </View>
          <View style={styles.parentGrid}>
            <Pressable
              onPress={() => navigation.navigate("Options", { theme: "html" })}
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/html.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>HTML</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Options", { theme: "mysql" })}
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/mysql.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>MySQL</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Options", { theme: "wordpress" })
              }
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/wordpress.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>WordPress</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Options", { theme: "laravel" })
              }
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/laravel.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>Laravel</Text>
            </Pressable>
          </View>
          <View style={styles.parentGrid}>
            <Pressable
              onPress={() =>
                navigation.navigate("Options", { theme: "kubernetes" })
              }
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/kubernetes.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>Kubernetes</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Options", { theme: "javascript" })
              }
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/javascript.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>JavaScript</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Options", { theme: "devops" })
              }
              style={styles.childGrid}
            >
              <View style={styles.iconsImageBackground}>
                <Image
                  style={styles.iconsImage}
                  source={require("../asset/devops.png")}
                />
              </View>
              <Text style={styles.iconsTitle}>DevOps</Text>
            </Pressable>
          </View>
        </Swiper>
      </View>
      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate("Questions", { time: 10 })}
          style={styles.subFooter}
        >
          <Image
            source={require("../asset/random.png")}
            style={styles.imageFooter}
          />
          <Text style={styles.textFooter}>Random</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Questions", { time: 10 })}
          style={styles.subFooter}
        >
          <Image
            source={require("../asset/error.png")}
            style={styles.imageFooter}
          />
          <Text style={styles.textFooter}>Retry</Text>
        </Pressable>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    width: "80%",
    padding: "3%",
    marginTop: "20%",
    borderRadius: "15px",
  },
  headerFirstText: {
    color: "white",
    fontSize: 18,
  },
  container: {
    width: "100%",
    height: "50%",
  },
  parentGrid: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: "10%",
  },
  childGrid: {
    width: "25%",
    height: "25%",
    margin: "10%",
  },
  iconsImageBackground: {
    borderRadius: "15px",
    borderColor: "#0782F9",
    borderWidth: 2,
    backgroundColor: "white",
    padding: 10,
  },
  iconsImage: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    width: "80%",
    height: "80%",
    aspectRatio: "1/1",
    objectFit: "contain",
  },
  iconsTitle: {
    color: "#0782F9",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "auto",
  },
  footer: {
    flexDirection: "row", // Permet d'afficher les éléments en ligne
    justifyContent: "center", // Centre les éléments horizontalement
  },
  subFooter: {
    width: 100,
    height: 100,
    backgroundColor: "#0782F9",
    marginHorizontal: 40, // Espacement horizontal entre les carrés
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
  },
  imageFooter: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  textFooter: {
    color: "white",
    fontSize: 16,
  },
});
