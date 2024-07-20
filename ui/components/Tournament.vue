<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Current Tournament</h2>
    <div v-if="currentRound < totalRounds">
      <h3 class="text-xl font-semibold mb-2">Round {{ currentRound + 1 }}</h3>
      <div v-if="currentQuestion">
        <Question :question="currentQuestion" />
        <div class="mt-4 flex justify-between">
          <button v-if="currentQuestionIndex > 0" @click="prevQuestion" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Previous</button>
          <button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Next</button>
          <button v-if="currentQuestionIndex === questions.length - 1" @click="submitAnswers" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit Answers</button>
        </div>
      </div>
      <div v-else>
        <p>No questions available.</p>
      </div>
    </div>
    <div v-else>
      <h3 class="text-xl font-semibold mb-2">Tournament Finished</h3>
      <p>Thank you for participating!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTriviaStore } from '@/store/trivia';
import Question from '@/components/Question.vue';

const triviaStore = useTriviaStore();
const currentRound = ref(0);
const totalRounds = ref(3); // Mock total rounds for the tournament

onMounted(async () => {
  await triviaStore.enterRound(1); // Enter a mock round with ID 1
});

const currentQuestion = computed(() => triviaStore.currentQuestion);
const currentQuestionIndex = computed(() => triviaStore.currentQuestionIndex);
const questions = computed(() => triviaStore.currentRoundQuestions);

const nextQuestion = () => {
  triviaStore.nextQuestion();
};

const prevQuestion = () => {
  triviaStore.prevQuestion();
};

const submitAnswers = () => {
  triviaStore.submitAnswers();
  if (currentRound.value < totalRounds.value - 1) {
    currentRound.value++;
    triviaStore.currentQuestionIndex = 0;
  } else {
    console.log('Tournament Finished');
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
