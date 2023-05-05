import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  Switch,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import SafeAreaView from "react-native-safe-area-view";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "./ProgressBar";

const QuestionsScreen = () => {
  const navigation = useNavigation();
  const answerViews = useRef({});
  const [responseQuestions, setResponseQuestions] = useState([]);
  const setViewRef = (key, ref) => {
    answerViews.current[key] = ref;
  };

  const selectAnswer = (key) => {
    if (!multipleCorrectAnswers) {
      Object.keys(selectedAnswers).map((item) => {
        selectedAnswers[item] = false;
      });
      selectedAnswers[key] = true;
    } else {
      selectedAnswers[key] = !selectedAnswers[key];
    }
    Object.keys(selectedAnswers)
      .filter((k) => selectedAnswers[k] !== key)
      .map((item) => {
        const color = selectedAnswers[item] ? "#8294ff" : "white";
        try {
          answerViews.current[item].setNativeProps({
            style: {
              backgroundColor: color,
            },
          });
        } catch (error) {}
        /*  answerViews.current?.children.forEach(child => {
          child.setNativeProps({style: {color: 'red'}});
        });*/
      });
  };

  const checkAnswer = () => {
    if (checkNext === "Next") setindexQuestion(indexQuestion + 1);
    setCheckNext("Next");
    let allCorrect = true;
    Object.keys(correctAnswers).map((item) => {
      const color = correctAnswers[item] == "true" ? "green" : "red";
      try {
        if (
          allCorrect &&
          selectedAnswers[item.replace("_correct", "")].toString() !==
            correctAnswers[item]
        ) {
          allCorrect = false;
          console.log("ok");
          if (checkNext === "Next")
            setResponseQuestions([
              ...responseQuestions,
              apiResponse[indexQuestion].question,
            ]);
        }
        answerViews.current[item.replace("_correct", "")].setNativeProps({
          style: {
            backgroundColor: color,
            color: "white",
          },
        });
      } catch (error) {}

      if (apiResponse.length - 1 === indexQuestion) {
        navigation.navigate("Result", {
          score: score,
          totalQuestions: apiResponse.length * 5,
          responseQuestions: responseQuestions,
        });
      }
    });

    if (allCorrect) {
      setScore(score + 5);
    }
  };
  const route = useRoute();
  const [apiResponse, setApiResponse] = useState([]);
  const [timeLeft, setTimeLeft] = useState(route.params.time);

  useEffect(() => {
    const fct = async () => {
      if (apiResponse.length === 0) {
        try {
          const response = await axios.get(
            "https://quizapi.io/api/v1/questions",
            {
              params: {
                apiKey: "jLoUlj3Aeoh6MQ7kpKbvxxeWEC84l3jlviEYn95K",
                category: route.params.theme,
                difficulty: route.params.niveau,
                tags: route.params.tags,
                limit: route.params.limit,
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
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [tip, setTip] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [counter, setCounter] = useState(0);
  const [indexQuestion, setindexQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [checkNext, setCheckNext] = useState("Check");
  useEffect(() => {
    if (apiResponse.length > indexQuestion) {
      setProgress((indexQuestion * 100) / apiResponse.length / 100);
      setQuestion(apiResponse[indexQuestion].question);
      setDescription(apiResponse[indexQuestion].description);
      setAnswers(apiResponse[indexQuestion].answers);
      setMultipleCorrectAnswers(
        apiResponse[indexQuestion].multipleCorrectAnswers
      );
      setCorrectAnswers(apiResponse[indexQuestion].correct_answers);
      setCorrectAnswer(apiResponse[indexQuestion].correct_answer);
      setExplanation(apiResponse[indexQuestion].explanation);
      setTip(apiResponse[indexQuestion].tip);
      setTags(apiResponse[indexQuestion].tags);
      setCategory(apiResponse[indexQuestion].category);
      setDifficulty(apiResponse[indexQuestion].difficulty);
      setSelectedAnswers({
        answer_a: false,
        answer_b: false,
        answer_c: false,
        answer_d: false,
        answer_e: false,
        answer_f: false,
      });
      selectAnswer(null);
      setCheckNext("Check");
      setTimeLeft(route.params.time);
    }
  }, [indexQuestion, apiResponse]);
  useEffect(() => {
    if (route.params.istimeLimit) {
      const intervalId = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setCheckNext("Check");
          checkAnswer();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);
  const [score, setScore] = useState(0);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {" "}
          {category} - {difficulty}
        </Text>
      </View>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          N° {indexQuestion + 1} : {question}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "10%",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>
            {score} pts / {apiResponse.length * 5}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Time Left: {route.params.istimeLimit ? timeLeft : "-"}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: "5%",
        }}
      >
        <ProgressBar progress={progress} />
      </View>

      <ScrollView style={{ height: 400 }}>
        {multipleCorrectAnswers ? (
          <Text style={styles.answersInfo}>multiple correct answers</Text>
        ) : (
          <Text style={styles.answersInfo}>Unique answer</Text>
        )}
        {Object.keys(answers)
          .filter((key) => answers[key] !== null)
          .map((key) => (
            <Pressable
              key={key}
              ref={(ref) => setViewRef(key, ref)}
              style={styles.answersBox}
              onPress={() => selectAnswer(key)}
            >
              <Text
                style={[
                  styles.answersText,
                  { color: checkNext === "Check" ? "black" : "white" },
                ]}
              >
                {key.substring(7).toUpperCase()} : {answers[key]}
              </Text>
            </Pressable>
          ))}
      </ScrollView>
      <View>
        <Text>{tip}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => checkAnswer()} style={styles.buttonNext}>
          <Text style={styles.buttonNextText}>{checkNext}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: "15%",
    height: 30,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0782F9",
    textAlign: "center",
  },
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
    height: 100,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  answersBox: {
    borderRadius: "6px",
    borderColor: "#0782F9",
    borderWidth: 2,
    backgroundColor: "white",
    margin: 15,
    flex: 1,
  },
  answersText: {
    padding: 3,
    fontSize: 20,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  buttonNext: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
    margin: 15,
  },
  buttonNextText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  answersInfo: {
    color: "gray",
    padding: 25,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
