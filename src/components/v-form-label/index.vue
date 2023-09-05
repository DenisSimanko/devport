<template>
  <label class="form-label" :for="forInput">{{ label }}</label>
</template>

<script>
export default {
  name: "VFormLabel",

  props: {
    forInput: {
      default: null,
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>
