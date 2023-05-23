import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import data from "../asset/data.json";
import Swiper from "react-native-swiper/src";
import { LineChart } from "react-native-chart-kit";
import { auth, db } from "../firebase"; // Assurez-vous d'avoir correctement importé 'db' depuis '../firebase'
import { collection, getDocs } from "firebase/firestore"; // Importez les fonctions nécessaires de Firestore
import { LanguageContext } from "../LanguageContext";
let itemList = [];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [randomText, setRandomText] = useState("");
  const [retryText, setRetryText] = useState("");
  const handleTranslate = () => {
    translateText("random").then((result) => {
      setRandomText(result.charAt(0).toUpperCase() + result.slice(1));
    });
    translateText("retry").then((result) => {
      setRetryText(result.charAt(0).toUpperCase() + result.slice(1));
    });
  };
  const [scores, setScores] = useState([]);
  const { translateText } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch scores from Firebase and update the state
    const fetchScores = async () => {
      try {
        // Assuming you have the user's email stored somewhere
        const userEmail = encodeURIComponent(auth.currentUser.email);

        // Make a Firebase query to fetch the scores based on user's email
        const scoresRef = collection(db, "scores");
        const scoresSnapshot = await getDocs(scoresRef);
        const userScoresDoc = scoresSnapshot.docs.find(
          (doc) => doc.id === userEmail
        );

        if (userScoresDoc) {
          const scoresData = userScoresDoc.data().scores;
          setScores(scoresData);
          setLoading(false);
        } else {
          console.log("No scores found for the user:", userEmail);
        }
      } catch (error) {
        console.log("Error fetching scores:", error);
      }
    };
    fetchScores();
    handleTranslate();
  }, []); // Empty dependency array to fetch the scores only once on component mount

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Pressable
            onPress={() => navigation.navigate("Logout")}
            style={styles.headerButton}
          >
            <Image
              source={require("../asset/logout.png")}
              style={styles.headerButtonIcon}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Setting")}
            style={styles.headerButton}
          >
            <Image
              source={require("../asset/settings.png")}
              style={styles.headerButtonIcon}
            />
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0782F9" />
          </View>
        ) : (
          <LineChart
            data={{
              datasets: [
                {
                  data: scores.map((element) => Number(element) || 0),
                },
              ],
            }}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: "#f2f2f2",
              backgroundGradientFrom: "#f2f2f2",
              backgroundGradientTo: "#f2f2f2",
              color: (opacity = 1) => `rgba(7, 130, 249, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "white",
              },
              formatYLabel: (value) => value.toFixed(2),
            }}
            bezier
          />
        )}
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
          <Text style={styles.textFooter}>{randomText}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Questions", { time: 10 })}
          style={styles.subFooter}
        >
          <Image
            source={require("../asset/error.png")}
            style={styles.imageFooter}
          />
          <Text style={styles.textFooter}>{retryText}</Text>
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
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between", // Utilisez "space-between" pour espacer les boutons
  },
  headerButton: {
    marginLeft: 10,
  },
  headerButtonIcon: {
    width: 20,
    height: 20,
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
