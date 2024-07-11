import { ref } from 'vue';

export const isSidebarOpen = ref(false);

export const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

export const closeSidebar = () => {
  isSidebarOpen.value = false;
};
