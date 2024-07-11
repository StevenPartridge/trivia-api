<template>
    <aside :class="{'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}" class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out md:static md:translate-x-0">
      <nav class="mt-4">
        <ul>
          <li>
            <button @click="navigateTo('/')" class="w-full py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Current Tournament">
              Current Tournament
            </button>
          </li>
          <li>
            <button @click="navigateTo('/leaderboard')" class="w-full py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Leaderboard">
              Leaderboard
            </button>
          </li>
          <li>
            <button @click="navigateTo('/past-tournaments')" class="w-full py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Past Tournaments">
              Past Tournaments
            </button>
          </li>
          <li>
            <button @click="navigateTo('/login')" class="w-full py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Login/Logout">
              {{ authStore.user ? 'Logout' : 'Login' }}
            </button>
          </li>
          <li>
            <button @click="navigateTo('/settings')" class="w-full py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Settings">
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  import { isSidebarOpen, closeSidebar } from '@/composables/useSidebar';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const navigateTo = (path: string) => {
    closeSidebar();
    router.push(path);
  };
  </script>
  