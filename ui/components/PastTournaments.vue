<template>
    <div class="p-4 bg-white shadow rounded-lg dark:bg-gray-800">
      <h3 class="text-lg font-semibold mb-4 dark:text-gray-100">Past Tournaments</h3>
      <div class="space-y-4 overflow-y-auto max-h-96">
        <div
          v-for="round in completedRounds"
          :key="round.id"
          class="p-4 bg-gray-100 shadow rounded-lg dark:bg-gray-700 dark:text-gray-100"
        >
          <h4 class="text-md font-semibold">Tournament {{ round.id }}</h4>
          <p>Start Time: {{ formatDate(round.start_time) }}</p>
          <p>Questions Answered: {{ round.numQuestionsAnswered }}</p>
          <p>Your Place: {{ round.userPlace }} / {{ round.totalEntrants }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useTriviaStore } from '@/store/trivia';
  import { computed } from 'vue';
  
  const triviaStore = useTriviaStore();
  const completedRounds = computed(() => triviaStore.completedRounds);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
  </script>
  
  <style scoped>
  /* Additional styling for scrollable list */
  .max-h-96 {
    max-height: 24rem; /* Adjust as needed */
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  </style>
  