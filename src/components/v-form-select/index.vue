<template>
  <select v-model="model" :class="classes">
    <option value="">{{ placeholder }}</option>
    <option v-for="option of options" :key="option.value" :value="option">
      {{ option[labelField] }}
    </option>
  </select>
</template>
<script>
import { isObject } from "lodash";

export default {
  name: "VFormSelect",

  model: {
    prop: "value",
    event: "change",
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    valueField: {
      type: String,
      default: "value",
    },
    labelField: {
      type: String,
      default: "label",
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
        return (
          this.options.find(
            (option) => option[this.valueField] === this.value
          ) || ""
        );
      },
      set(value) {
        const formattedValue = isObject(value) ? value[this.valueField] : "";

        this.$emit("update:value", formattedValue);
        this.$emit("change", formattedValue);
      },
    },

    classes() {
      return {
        "form-select": true,
        ...(this.size ? { [`form-select-${this.size}`]: true } : {}),
      };
    },
  },
};
</script>
