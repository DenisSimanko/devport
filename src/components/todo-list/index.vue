<template>
  <div class="todo-list p-3">
    <table class="todo-list-table table table-striped table-hover">
      <thead class="table-primary">
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">
            <v-form-select
              v-model="filters.userId"
              :options="userIds"
              size="sm"
              placeholder="All Users"
            />
          </th>
          <th class="text-center">
            <v-form-input
              v-model="filters.title"
              size="sm"
              placeholder="Title"
            />
          </th>
          <th class="text-center">
            <v-form-select
              v-model="filters.completed"
              :options="completionOptions"
              size="sm"
              placeholder="All"
            />
          </th>
          <th class="text-center">Favorite</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="filteredTodos.length">
          <todo-item
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            :is-favorite="isItemFavorite(todo.id)"
            @set-favorite="onTodoItemSetFavorite"
          />
        </template>
        <template v-else>
          <tr>
            <td colspan="5">No todos found</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import TodoItem from "@/components/todo-item/index.vue";
import VFormSelect from "@/components/v-form-select/index.vue";
import VFormInput from "@/components/v-form-input/index.vue";
import { uniqBy } from "lodash";
import TodoFavoriteManager from "@/lib/todo-favorite-manager/index.js";

export default {
  name: "TodoList",

  components: {
    TodoItem,
    VFormSelect,
    VFormInput,
  },

  props: {
    todos: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      filters: {
        userId: "",
        title: "",
        completed: "",
      },
      completionOptions: [
        {
          value: true,
          label: "Completed",
        },
        {
          value: false,
          label: "Uncompleted",
        },
        {
          value: "favorite",
          label: "Favorites",
        },
      ],
      todoFavoriteManager: null,
      todoFavoriteList: [],
    };
  },

  computed: {
    userIds() {
      return [
        ...uniqBy(this.todos, "userId").map((todo) => ({
          value: todo.userId,
          label: todo.userId,
        })),
      ];
    },

    filteredTodosByUserId() {
      const { userId } = this.filters;
      if (!userId) {
        return this.todos;
      }

      return this.todos.filter((todo) => todo.userId === userId);
    },

    filteredByTitle() {
      const { title } = this.filters;
      if (!title) {
        return this.filteredTodosByUserId;
      }

      return this.filteredTodosByUserId.filter((todo) =>
        todo.title.toLowerCase().includes(title.toLowerCase())
      );
    },

    filteredByCompletionAndFavorite() {
      const { completed } = this.filters;
      if (completed === "favorite") {
        return this.filteredByTitle.filter((todo) =>
          this.isItemFavorite(todo.id)
        );
      }

      if (typeof completed !== "boolean") {
        return this.filteredByTitle;
      }

      return this.filteredByTitle.filter(
        (todo) => todo.completed === completed
      );
    },

    filteredTodos() {
      return this.filteredByCompletionAndFavorite;
    },
  },

  created() {
    this.todoFavoriteManager = new TodoFavoriteManager();
    this.todoFavoriteList = this.todoFavoriteManager.getItems();
  },

  methods: {
    // TODO: add cross window support
    onTodoItemSetFavorite({ todoId, value }) {
      if (value) {
        this.todoFavoriteManager.addItem(todoId);
      } else {
        this.todoFavoriteManager.removeItem(todoId);
      }

      this.todoFavoriteList = this.todoFavoriteManager.getItems();
    },

    isItemFavorite(todoId) {
      return this.todoFavoriteList.includes(todoId);
    },
  },
};
</script>

<style lang="scss">
.todo-list {
  background-color: $gray-100;
  border-radius: $border-radius;
}

.todo-list-table {
  border-radius: $border-radius;
  overflow: hidden;
}
</style>
