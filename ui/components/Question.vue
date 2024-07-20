<template>
    <div class="p-4 bg-white shadow rounded-lg dark:bg-gray-800">
      <h3 class="text-lg font-semibold mb-4 dark:text-gray-100">{{ question.question || "Blah" }}</h3>
      <ul>
        <li v-for="option in answers" :key="option" class="mb-2">
          <label class="flex items-center">
            <input type="radio" :name="`question-${question.id}`" :value="option" v-model="selectedOption" class="mr-2" />
            <span class="dark:text-gray-300">{{ option }}</span>
          </label>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useTriviaStore } from '@/store/trivia';
  import type { TriviaQuestion } from '@/models/TriviaQuestion';
  
  const triviaStore = useTriviaStore();
  const props = defineProps<{ question: TriviaQuestion }>();
  
  const selectedOption = ref(triviaStore.answers.find(answer => answer.questionId === props.question.id)?.selectedOption || '');
  
  const answers = computed(() =>{
     return props.question?.getAllAnswers() || ['Red', 'Green', 'Blue', 'Yellow']}
    );
  
  watch(selectedOption, (newOption) => {
    triviaStore.answerQuestion(props.question.id, newOption);
  });
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  