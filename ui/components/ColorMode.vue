<template>
    <div class="p-4">
      <h1 class="text-xl mb-4">Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference" class="p-2 border rounded-md">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
      <div class="mt-4">
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-secondary ml-2">Secondary Button</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const colorMode = useColorMode()
  console.log(colorMode.preference)
  </script>
  