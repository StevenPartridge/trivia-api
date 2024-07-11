<template>
    <div class="flex flex-col min-h-screen">
      <Header />
      <div class="flex flex-1">
        <Sidebar />
        <main class="flex-1 p-4">
          <NuxtPage />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  </script>
  