import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const ResultsPage = ({ score, totalQuestions, incorrectQuestions, handleRetryQuiz }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score} / {totalQuestions}</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      <View style={styles.messageContainer}>
        {percentage > 80 ? (
          <Text style={styles.message}>Félicitations, vous avez réussi le quizz !</Text>
        ) : (
          <Text style={styles.message}>Vous pouvez faire mieux, continuez à vous entraîner.</Text>
        )}
      </View>
      {incorrectQuestions.length > 0 && (
        <View style={styles.incorrectQuestionsContainer}>
          <Text style={styles.incorrectQuestionsTitle}>Questions incorrectes</Text>
          {incorrectQuestions.map((question, index) => (
            <Text style={styles.incorrectQuestion} key={index}>{question}</Text>
          ))}
        </View>
      )}
      <Button title="Recommencer le quizz" onPress={handleRetryQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
  incorrectQuestionsContainer: {
    marginTop: 20,
  },
  incorrectQuestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  incorrectQuestion: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ResultsPage;
