<template>
  <header class="bg-indigo-600 text-white dark:bg-indigo-800">
    <div class="container mx-auto flex items-center justify-between p-4">
      <h1 class="text-2xl font-bold">Trivia Game</h1>
      <div class="space-x-4">
        <span v-if="triviaStore.isUserInTournament">You are in the tournament!</span>
        <span v-else>Next round starting in {{ nextRoundStartingIn }}</span>
        <button @click="toggleSidebar" class="block md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { toggleSidebar } from '@/composables/useSidebar';
import { useTriviaStore } from '@/store/trivia';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const triviaStore = useTriviaStore();
const nextRoundStartingIn = ref("");

const updateNextRoundStartingIn = () => {
  const nextRound = new Date(triviaStore.nextRoundStartTime);
  const now = new Date();
  const diff = nextRound - now;
  if (diff > 0) {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    nextRoundStartingIn.value = `${minutes}m ${seconds}s`;
  } else {
    nextRoundStartingIn.value = "Round has started!";
  }
};

// Update the time remaining every second
let intervalId;
onMounted(() => {
  updateNextRoundStartingIn();
  intervalId = setInterval(updateNextRoundStartingIn, 1000);
});

// Clean up the interval when the component is unmounted
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
