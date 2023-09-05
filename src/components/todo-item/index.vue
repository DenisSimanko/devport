<template>
  <tr class="todo-item">
    <td class="text-center">{{ todo.id }}</td>
    <td class="text-center">{{ todo.userId }}</td>
    <td>{{ todo.title }}</td>
    <td class="text-center">{{ todo.completed }}</td>
    <td class="text-center">
      <v-form-checkbox :checked="isFavorite" @change="onVFormCheckboxChange" />
    </td>
  </tr>
</template>

<script>
import VFormCheckbox from "@/components/v-form-checkbox/index.vue";

export default {
  name: "TodoItem",

  components: {
    VFormCheckbox,
  },

  props: {
    todo: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onVFormCheckboxChange(value) {
      this.$emit("set-favorite", { todoId: this.todo.id, value });
    },
  },
};
</script>

<style lang="scss"></style>
