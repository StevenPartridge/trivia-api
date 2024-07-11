<template>
    <div>
      <h1>Current Round</h1>
      <div v-if="triviaStore.currentRound">
        <h2>Round ID: {{ triviaStore.currentRound.id }}</h2>
        <p>Status: {{ triviaStore.currentRound.status }}</p>
        <button @click="fetchQuestions">Start Round</button>
        <div v-for="question in triviaStore.questions" :key="question.id">
          <p>{{ question.question }}</p>
          <div v-for="answer in question.getAllAnswers()" :key="answer">
            <button @click="answerQuestion(question.id, answer)">{{ answer }}</button>
          </div>
        </div>
        <button @click="submitAnswers">Submit Answers</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useTriviaStore } from '@/store/trivia';
  
  const triviaStore = useTriviaStore();
  
  const fetchQuestions = async () => {
    await triviaStore.fetchQuestions();
  };
  
  const answerQuestion = (questionId: number, answer: string) => {
    triviaStore.answerQuestion(questionId, answer);
  };
  
  const submitAnswers = async () => {
    await triviaStore.submitAnswers();
  };
  </script>
  