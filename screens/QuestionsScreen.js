import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRoute } from '@react-navigation/native'

const QuestionsScreen = () => {
    const route = useRoute();
    console.log(route.params);

    const limit = 1;
    const [apiResponse, setApiResponse] = useState([]);
    useEffect( () => {
        const fct = async () => {
            try {
            
                const response = await axios.get('https://quizapi.io/api/v1/questions', {
                    params: {
                        'apiKey': 'jLoUlj3Aeoh6MQ7kpKbvxxeWEC84l3jlviEYn95K',
                        'category' : route.params.theme ,
                        'tags' : tags,
                        'difficulty' :selectedLvl ,
                        'limit': limit
                    }
                });
                navigation.navigate('Questions', {
                    theme : route.params.theme,
                    niveau : selectedLvl,
                    tags : "",
                    limit : limit
                })


            } catch (error) {
                console.log(error)
            }
        }
        fct();
    },[]);
    const [id, setId] = useState(0);
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [answers, setAnswers] = useState([]);
    const [multipleCorrectAnswers, setMultipleCorrectAnswers] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [tip, setTip] = useState('');
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
  
   
    const [indexQuestion, setindexQuestion] = useState(0);
   
    setId(apiResponse.data[0].id);
    setQuestion(apiResponse.data[0].question);
    setDescription(apiResponse.data[0].description);
    setAnswers(apiResponse.data[0].answers);
    setMultipleCorrectAnswers(apiResponse.data[0].multipleCorrectAnswers);
    setCorrectAnswers(apiResponse.data[0].correctAnswers);
    setCorrectAnswer(apiResponse.data[0].correctAnswer);
    setExplanation(apiResponse.data[0].explanation);
    setTip(apiResponse.data[0].tip);
    setTags(apiResponse.data[0].tags);
    setCategory(apiResponse.data[0].category);
    setDifficulty(apiResponse.data[0].difficulty);
   
    const [score, setScore] = useState(0);
    
    return (
        <View>
   
    </View>
    )
}

export default QuestionsScreen

const styles = StyleSheet.create({})