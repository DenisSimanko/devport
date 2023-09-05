<template>
  <div class="login-view">
    <LoginForm
      v-if="isUsersInitialized"
      class="login-view__login-form"
      @submit="onLoginFormSubmit"
    />
  </div>
</template>

<script>
import LoginForm from "@/components/login-form/index.vue";
import { getAllUsers } from "@/api/user";
import { mapState, mapActions, mapWritableState } from "pinia";
import { useUsersStore } from "@/stores/users";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "LoginView",

  components: {
    LoginForm,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(useUsersStore, {
      users: (state) => state.users,
      isUsersInitialized: (state) => state.isInitialized,
    }),

    ...mapWritableState(useAuthStore, ["isAuthenticated", "userId"]),
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    ...mapActions(useUsersStore, ["setUsers"]),

    async getAllUsers() {
      try {
        const users = await getAllUsers();
        this.setUsers(users);
      } catch (error) {
        // TODO: Add error handling
        console.error(error);
      }
    },

    findUser(formData) {
      return this.users.find(
        (user) =>
          user.username === formData.userName &&
          user.phone === formData.password
      );
    },

    authorize(formData) {
      const user = this.findUser(formData);

      if (!user) {
        // TODO: Add error message
      } else {
        this.isAuthenticated = true;
        this.userId = user.id;
        this.$router.push({ name: "index" });
      }
    },

    onLoginFormSubmit(formData) {
      this.authorize(formData);
    },
  },
};
</script>

<style lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;

  &__login-form {
    width: 400px;
  }
}
</style>
