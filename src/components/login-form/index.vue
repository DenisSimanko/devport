<template>
  <form class="login-form">
    <div class="py-3 text-center login-form-header">
      <span class="fs-5">description</span>
    </div>
    <div class="login-form__body">
      <v-form-label for-input="username" label="description" />
      <!-- TODO: Add validation hint -->
      <v-form-input
        id="username"
        v-model="v$.form.userName.$model"
        :has-error="v$.form.userName.$error"
        class="login-form-body__user-input"
        placeholder="Username"
        type="text"
      />
      <!-- TODO: Add validation hint -->
      <v-form-input
        id="password"
        v-model="v$.form.password.$model"
        :has-error="v$.form.password.$error"
        class="login-form-body__pass-input"
        placeholder="Phone Number"
        type="password"
      />
      <div>
        <button
          type="submit"
          class="btn btn-primary w-100 text-white"
          :disabled="isSubmitDisabled"
          @click.prevent="onSubmit"
        >
          Register
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import VFormInput from "@/components/v-form-input/index.vue";
import VFormLabel from "@/components/v-form-label/index.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, alpha } from "@vuelidate/validators";

export default {
  name: "LoginForm",

  components: {
    VFormInput,
    VFormLabel,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      form: {
        userName: "",
        password: "",
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
        userName: { required, alpha },
        password: { required },
      },
    };
  },
};
</script>

<style lang="scss">
// TODO propose to make default font-size 16px in design system
.login-form {
  background-color: $gray-100;
  border-radius: $border-radius;
  overflow: hidden;

  &__body {
    padding: 1rem $login-form-25 2rem $login-form-25;
  }
}
.login-form-header {
  background-color: $gray-200;
}

.login-form-body {
  &__user-input {
    margin-bottom: $login-form-20;
  }

  &__pass-input {
    margin-bottom: $login-form-25;
  }
}
</style>
