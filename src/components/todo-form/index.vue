<template>
  <form class="todo-form p-3">
    <v-form-input
      id="user-id"
      v-model="v$.form.userId.$model"
      class="mb-3"
      :has-error="v$.form.userId.$error"
      placeholder="User Id"
      type="text"
    />
    <v-form-input
      id="user-id"
      v-model="v$.form.title.$model"
      class="mb-3"
      :has-error="v$.form.title.$error"
      placeholder="Title"
      type="text"
    />
    <div>
      <button
        type="submit"
        class="btn btn-primary w-100 text-white"
        :disabled="isSubmitDisabled"
        @click.prevent="onSubmit"
      >
        Add
      </button>
    </div>
  </form>
</template>
<script>
import VFormInput from "@/components/v-form-input/index.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, integer, minValue } from "@vuelidate/validators";

export default {
  name: "TodoForm",

  components: {
    VFormInput,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      form: {
        userId: null,
        title: null,
      },
    };
  },

  computed: {
    isSubmitDisabled() {
      return this.v$.form.$error;
    },
  },

  methods: {
    async onSubmit() {
      const isFormValid = await this.v$.form.$validate();

      if (!isFormValid) {
        // TODO: Add error message
        return;
      }
      this.$emit("submit", this.form);
    },
  },

  validations() {
    return {
      form: {
        userId: { required, integer, minValue: minValue(1) },
        title: { required },
      },
    };
  },
};
</script>

<style lang="scss">
.todo-form {
  background-color: $gray-100;
  border-radius: $border-radius;
}
</style>
