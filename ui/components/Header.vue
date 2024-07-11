<template>
    <header class="bg-indigo-600 text-white dark:bg-indigo-800">
      <div class="container mx-auto flex items-center justify-between p-4">
        <h1 class="text-2xl font-bold">Trivia Game</h1>
        <div class="space-x-4">
          <span>Next round starting in 02:03:12.123</span>
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
  </script>
  