import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { doc, getDocs, collection, query, orderBy, limit, updateDoc, arrayUnion, serverTimestamp, setDoc } from "firebase/firestore";

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [score, setScore] = useState(route.params?.score);
  const [totalQuestions, setTotalQuestions] = useState(
    route.params?.totalQuestions
  );
  const [responseQuestions, setResponseQuestions] = useState(
    route.params?.responseQuestions
  );
  const percentage = Math.round((score / totalQuestions) * 100);
  const [latestScores, setLatestScores] = useState([]);

  const getLatestScores = async () => {
    try {
      const scoresRef = collection(db, "scores");
      const scoresQuery = query(
        scoresRef,
        orderBy("timestamp", "desc"),
        limit(10)
      );
      const scoresSnapshot = await getDocs(scoresQuery);
      const scoresData = scoresSnapshot.docs.map((doc) => doc.data());
      setLatestScores(scoresData);
    } catch (error) {
      console.error("Error fetching latest scores:", error);
    }
  };

  const addScoreToFirestore = async (score) => {
    try {
      if (auth.currentUser) {
        const userEmail = encodeURIComponent(auth.currentUser.email);
        const scoresRef = collection(db, "scores");
  
        const scoresSnapshot = await getDocs(scoresRef);
        const userScoresDoc = scoresSnapshot.docs.find(
          (doc) => doc.id === userEmail
        );
  
        if (userScoresDoc) {
          // Si le document des scores existe, mettez à jour les champs scores et timestamps
          const docRef = doc(db, "scores", userEmail);
          await updateDoc(docRef, {
            scores: arrayUnion(score),
           // timestamps: arrayUnion(serverTimestamp().toDate().toLocaleString()),
          });
        } else {
          // Si le document des scores n'existe pas, créez-le avec les champs scores et timestamps
          const docRef = doc(db, "scores", userEmail);
          await setDoc(docRef, {
            scores: [score],
        //    timestamps: [serverTimestamp().toDate().toLocaleString()],
          });
        }
        console.log("Score added to Firestore!");
      } else {
        console.log("User not authenticated.");
      }
    } catch (error) {
      console.error("Error adding score to Firestore:", error);
    }
  };
  
  
  useEffect(() => {
    getLatestScores();
    addScoreToFirestore(score);
  }, []);

  const renderScoreItem = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text>{item.score}</Text>
      <Text>{item.timestamp?.toDate()?.toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>
          {score} / {totalQuestions}
        </Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      <View style={styles.messageContainer}>
        {percentage > 80 ? (
          <Text style={styles.message}>
            Félicitations, vous avez réussi le quizz !
          </Text>
        ) : (
          <Text style={styles.message}>
            Vous pouvez faire mieux, continuez à vous entraîner.
          </Text>
        )}
      </View>
      {responseQuestions?.length > 0 && (
        <View style={styles.responseQuestionsContainer}>
          <Text style={styles.responseQuestionsTitle}>
            Questions incorrectes
          </Text>
          {responseQuestions.map((question, index) => (
            <Text style={styles.incorrectQuestion} key={index}>
              {index + 1} - {question}
            </Text>
          ))}
        </View>
      )}
      <FlatList
        data={latestScores}
        renderItem={renderScoreItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Retourner à l'accueil"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    marginRight: 10,
  },
  percentage: {
    fontSize: 24,
  },
  messageContainer: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
  responseQuestionsContainer: {
    marginTop: 20,
  },
  responseQuestionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  incorrectQuestion: {
    fontSize: 16,
    marginBottom: 5,
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ResultScreen;
