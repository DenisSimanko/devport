import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAutheticated = ref(false);

  return { isAutheticated };
});
