import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    isInitialized: false,
  }),
  actions: {
    setUsers(users) {
      this.users = users;
      this.isInitialized = true;
    },
  },
});
