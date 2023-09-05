<template>
  <div class="index-view container py-3">
    <user-data v-if="user" class="mb-4" :user="user" />
    <todo-form class="mb-4" @submit="onTodoFormSubmit" />
    <todo-list :todos="todos" />
  </div>
</template>

<script>
import UserData from "@/components/user-data/index.vue";
import TodoForm from "@/components/todo-form/index.vue";
import TodoList from "@/components/todo-list/index.vue";
import { mapState } from "pinia";
import { useUsersStore } from "@/stores/users";
import { useAuthStore } from "@/stores/auth";
import { getAllTodos, addTodo } from "@/api/todo";

export default {
  name: "IndexView",

  components: {
    UserData,
    TodoForm,
    TodoList,
  },

  data() {
    return {
      todos: [],
    };
  },

  computed: {
    ...mapState(useAuthStore, {
      userId: (state) => state.userId,
    }),

    ...mapState(useUsersStore, {
      users: (state) => state.users,
    }),

    user() {
      return this.users.find((user) => user.id === this.userId);
    },
  },

  async created() {
    await this.fetchTodos();
  },

  methods: {
    async fetchTodos() {
      const todos = await getAllTodos();
      this.todos = todos;
    },

    async onTodoFormSubmit(formData) {
      const customTodo = {
        id: Date.now(),
        completed: false,
        ...formData,
      };

      try {
        await addTodo(customTodo);
        this.todos.push(customTodo);
      } catch (error) {
        // TODO: add error handling
        console.error(error);
      }
    },
  },
};
</script>
