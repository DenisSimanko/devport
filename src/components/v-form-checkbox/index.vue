<template>
  <input
    :id="id"
    :checked="checked"
    type="checkbox"
    class="form-check-input"
    @click="onClickCheckbox"
  />
</template>

<script>
export default {
  name: "VFormCheckbox",

  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
  },

  methods: {
    onClickCheckbox() {
      this.$emit("change", !this.checked);
    },
  },
};
</script>
