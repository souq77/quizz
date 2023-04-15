import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const QuestionsScreen = () => {
    const [response, setResponse] = useState([]);

    useEffect( () => {
        const fct = async () => {
            try {
            
                const response = await axios.get('https://quizapi.io/api/v1/questions', {
                    params: {
                        'apiKey': 'jLoUlj3Aeoh6MQ7kpKbvxxeWEC84l3jlviEYn95K',
                        'limit': '10'
                    }
                });
                setResponse(response);
            } catch (error) {
                console.log(error)
            }
        }
        fct();
        
    },[]);
    return (
        <View>
            <Text>{ JSON.stringify(response) }</Text>
        </View>
    )
}

export default QuestionsScreen

const styles = StyleSheet.create({})