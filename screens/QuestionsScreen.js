import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SafeAreaView from "react-native-safe-area-view";
import { useRoute } from "@react-navigation/native";

const QuestionsScreen = () => {
  const route = useRoute();
  const [apiResponse, setApiResponse] = useState([]);

  useEffect(() => {
    const fct = async () => {
      if (apiResponse.length === 0) {
        try {
          const response = await axios.get(
            "https://quizapi.io/api/v1/questions",
            {
              params: {
                apiKey: "jLoUlj3Aeoh6MQ7kpKbvxxeWEC84l3jlviEYn95K",
                limit: 1,
              },
            }
          );
          setApiResponse(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fct();
  }, []);

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState([]);
  const [multipleCorrectAnswers, setMultipleCorrectAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [tip, setTip] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [counter, setCounter] = useState(0);
  const [indexQuestion, setindexQuestion] = useState(0);
  useEffect(() => {
    if (apiResponse.length !== 0) {
      setQuestion(apiResponse[indexQuestion].question);
      setDescription(apiResponse[indexQuestion].description);
      setAnswers(apiResponse[indexQuestion].answers);
      setMultipleCorrectAnswers(
        apiResponse[indexQuestion].multipleCorrectAnswers
      );
      setCorrectAnswers(apiResponse[indexQuestion].correctAnswers);
      setCorrectAnswer(apiResponse[indexQuestion].correctAnswer);
      setExplanation(apiResponse[indexQuestion].explanation);
      setTip(apiResponse[indexQuestion].tip);
      setTags(apiResponse[indexQuestion].tags);
      setCategory(apiResponse[indexQuestion].category);
      setDifficulty(apiResponse[indexQuestion].difficulty);
    }
  }, [indexQuestion, apiResponse]);

  const [score, setScore] = useState(0);
  console.log(answers);
  return (
    <View>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          N° {indexQuestion + 1} : {question}
        </Text>
      </View>
      <View style={{ height : "15%",flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, padding : 30 }}>
          <Text>Left Component</Text>
        </View>
        <View style={{ flex: 1 , padding : 30  }}>
          <Text>Right Component</Text>
        </View>
      </View>
      {Object.keys(answers).map((key) => (
        <View key={key} style={styles.answersBox}>
          <Text style={styles.answersText}>
            {key.substring(7).toUpperCase()} : {answers[key]}
          </Text>
        </View>
      ))}
      <View>
      </View>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  questionBox: {
    backgroundColor: "#0782F9",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin: "5%",
    marginTop: "20%",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  answersBox: {
    borderRadius: "15px",
    borderColor: "#0782F9",
    borderWidth: 3,
    backgroundColor: "white",
    margin: 15,
    height: "7%",
  },
  answersText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
});
