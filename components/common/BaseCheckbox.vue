<template>
  <div class="form-group">
    <input
      type="checkbox"
      class="checkbox"
      :id="id"
      :value="inputValue"
      v-model="model" />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    inputValue: Boolean,
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped lang="scss">
.form-group {
  @apply flex items-center;

  label {
    @apply ml-2.5 mt-[3px] text-sm font-medium text-gray-dark select-none;
  }

  .checkbox {
    @apply w-[18px]
    h-[18px]
    rounded
    checked:bg-primary
    text-primary
    bg-gray-100
    accent-primary
    border-gray-300
    focus:ring-blue-500
    focus:ring-2;
  }
}
</style>
