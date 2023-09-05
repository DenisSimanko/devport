<template>
  <input
    :id="id"
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :class="classes"
  />
</template>

<script>
export default {
  name: "VFormInput",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    id: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "password"].includes(`${value}`);
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return ["sm", "lg"].includes(`${value}`);
      },
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
        this.$emit("input", value);
      },
    },

    classes() {
      return {
        "form-control": true,
        "is-invalid": this.hasError,
        ...(this.size ? { [`form-control-${this.size}`]: true } : {}),
      };
    },
  },
};
</script>
