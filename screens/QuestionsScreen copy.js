Skip to content
Search or jump to…
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@souq77 
souq77
/
QuizzApp
Public
Cannot fork because you own this repository and are not a member of any organizations.
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Beta Try the new code view
QuizzApp/screens/QuestionsScreen.js /

Ali Saïd MOHAMADOU v3
Latest commit cefc820 on Nov 25, 2022
 History
 1 contributor
238 lines (215 sloc)  10.7 KB
 

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import questionsBiology from '../data/questions/biologieQuestions';
import questionsCelebrity from '../data/questions/celebrityQuestions';
import questionsGastronomie from '../data/questions/gastronomieQuestions';
import questionsSuperHero from '../data/questions/superherosQuestions';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
//import { useTranslation } from 'react-i18next';
//import classes from './intro.module.scss'


function getTheme(theme) {
    switch (theme) {
        case 'Biology':
            return questionsBiology;
            break;
        case 'Celebrity':
            return questionsCelebrity;
            break;
        case 'Gastronomy':
            return questionsGastronomie;
            break;
        case 'SuperHeros':
            return questionsSuperHero;
            break;
        default:
            break;
    }
}
const QuestionsScreen = () => {
   

    const route = useRoute();
    const navigation = useNavigation();
    const data = getTheme(route.params.theme);
    const [points, setPoints] = useState(0);
    const [showAnecdote, setShowAnecdote] = useState(false);
    const [index, setIndex] = useState(0);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [counter, setCounter] = useState(15);
    let interval = null;
    const currentQuestion = data.questions[index];
    const progressBar = Math.floor((index / data.questions.length) * 100);

    useEffect(() => {
        if (selectedAnswerIndex !== null) {
            setShowAnecdote(true);
            if (selectedAnswerIndex === currentQuestion.réponse) {
                setPoints((points) => points + 5);
                setAnswerStatus(true);
                answers.push({ question: index + 1, answer: true });
            } else {

                setAnswerStatus(false);
                answers.push({ question: index + 1, answer: false });
            }
        }
    }, [selectedAnswerIndex, showAnecdote]);

    useEffect(() => {
        setShowAnecdote(false);
        setSelectedAnswerIndex(null);
        setAnswerStatus(null);
    }, [index]);

    useEffect(() => {
        const myInterval = () => {
            if (counter >= 1) {
                setCounter((counter) => counter - 1);
            }
            if (counter === 0) {
                setIndex(index + 1);
                setCounter(15);
            }
        };

        interval = setTimeout(myInterval, 1000);
        return () => {
            clearTimeout(interval);
        }
    }, [counter]);

    useEffect(() => {
        if (!interval) {
            setCounter(15);
        }
    }, [index]);

    useEffect(() => {
        if (index + 1 > data.questions.length) {
            navigation.navigate("Results", {
                answers: answers,
                points: points
            })
        }
    }, [index]);
    return (

        <LinearGradient
            // Dégradé de couleur
            colors={['#1C2345', '#3c4780',]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
            style={{
                height: "100%",
                alignItems: 'center'
            }}>

            <SafeAreaView>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                    <Text style={{ color: "#ffffff", fontSize: 20 }}> Thème Biologie</Text>
                    <Pressable style={{ padding: 10, backgroundColor: "#57D4F6", borderRadius: 10 }}>
                        {<Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Temps restants : {counter}s</Text>}
                    </Pressable>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }}>
                    <Text style={{ color: "#ffffff", fontSize: 20 }}>Progression</Text>
                    <Text style={{ color: "#ffffff", fontSize: 20 }}>( {index + 1} / {data.questions.length} )</Text>
                </View>
                <View
                    style={{
                        backgroundColor: "#3c4780",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        height: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        marginTop: 20,
                        marginLeft: 10,
                        padding: 7,
                    }}
                >
                    <Text
                        style={{
                            backgroundColor: "#57D4F6",
                            borderRadius: 12,
                            position: "absolute",
                            left: 0,
                            height: 10,
                            right: 0,
                            width: `${progressBar}` + "%",
                            marginTop: 20,
                            padding: 7,
                        }}>

                    </Text>
                </View>

                <View style={{ marginTop: 10, padding: 10, borderRadius: 6, borderRadius: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#ffffff" }}>{currentQuestion?.question}</Text>
                    <View style={{ marginTop: 12, borderRadius: 20, padding: 10 }}>
                        {currentQuestion?.propositions.map((item, index) => (
                            <Pressable style={{ color: "white" }} onPress={() => selectedAnswerIndex === null && setSelectedAnswerIndex(index)}
                                style={
                                    selectedAnswerIndex === index && index === currentQuestion.réponse - 1
                                        ? { borderRadius: " 30px", color: "white", flexDirection: "row", alignItems: "center", borderWidth: 4, borderColor:"green", marginVertical: 10 }
                                        : selectedAnswerIndex !== null && selectedAnswerIndex === index ?
                                            { borderRadius: " 30px", flexDirection: "row", alignItems: "center", borderWidth: 0.5, borderColor:"green", borderWidth: 4, borderColor:"red", marginVertical: 10 } :
                                            { borderRadius: " 30px", flexDirection: "row", alignItems: "center", borderWidth: 0.5, borderColor: "white", marginVertical: 10 }
                                }>
                                {selectedAnswerIndex === index && index === currentQuestion?.réponse - 1 ? (
                                    <AntDesign style={{ borderRadius: " 30px", color: "white", borderColor: "#00FFF", textAlign: "center", width: 40, borderRadius: 20, height: 40, padding: 10 }} name='checkcircle' size={20} color="white" />
                                ) : selectedAnswerIndex != null && selectedAnswerIndex === index ? (
                                    <AntDesign style={{ borderRadius: " 30px", color: "white", borderColor: "#00FFF", textAlign: "center", width: 40, borderRadius: 20, height: 40, padding: 10 }} name='closecircle' size={20} color="white" />
                                ) : (
                                    <><Text style={{ borderRadius: " 30px", color: "white", borderColor: "#00FFF", textAlign: "center", width: 40, borderRadius: 20, height: 40, padding: 10 }}>{index + 1}</Text><Text style={{ color: "white", marginLeft: 10 }}>{item}</Text></>
                                )}
                            </Pressable >
                        ))}
                    </View>
                </View>
                <Text style={{ color: "white", padding:5, fontSize:20, display:showAnecdote == true ? 'block' : 'none'}}> Réponse :</Text>
                <Text style={{ color: "white", padding:10, display:showAnecdote == true ? 'block' : 'none' }}>{data.questions[index]?.anecdote}</Text>

                <View style={answerStatus === null ? null :
                    { marginTop: 20, backgroundColor: "#57D4F6", padding: 10, borderRadius: 7, height: 120 }}>
                    {answerStatus === null ? null : (
                        <Text
                            style={answerStatus === null ? null :
                                { fontSize: 17, textAlign: "center", fontWeight: "bold", color: "#ffffff" }}
                        >{!!answerStatus ? "Mauvaise reponse" : "Bonne reponse"}</Text>
                    )}
                    {index + 1 >= data.questions.length ? (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("Results", {
                                    points: points,
                                    answers: answers
                                })
                            }
                            style={{
                                backgroundColor: selectedAnswerIndex === currentQuestion?.réponse - 1 ? "green" : "red",
                                padding: 10,
                                marginLeft: "auto",
                                marginRight: "auto",
                                margintTop: 20,
                                borderRadius: 6
                            }}
                        >

                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: "center" }}>Fin</Text>

                        </Pressable>
                    ) : answerStatus === null ? null : (
                        <Pressable
                            onPress={() => setIndex(index + 1)}
                            style={{
                                backgroundColor: selectedAnswerIndex === currentQuestion?.réponse - 1 ? "green" : "red",
                                padding: 10,
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: 20,
                                borderRadius: 6,
                            }}
                        >

                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: "center" }}>Prochaine question</Text>

                        </Pressable>
                    )}

                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default QuestionsScreen

const styles = StyleSheet.create({})
