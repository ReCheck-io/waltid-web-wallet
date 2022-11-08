<template>
  <div class="form-group relative" :class="{ 'w-full': block }">
    <span class="input-header" v-if="label">
      <label :for="name">
        {{ label }}
      </label>
    </span>

    <input
      :id="name"
      :name="name"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :autoComplete="autoComplete"
      v-model="model"
      class="field" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      // required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'on',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
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
  @apply flex flex-col;

  label {
    @apply mb-3 text-sm font-medium text-gray-dark select-none;
  }
}

.input-header {
  @apply flex items-center justify-between;

  span {
    @apply flex items-center;

    svg {
      @apply w-4 h-4 ml-1.5 text-gray-400;
    }
  }

  p {
    @apply text-red-600 text-xs mb-0;
  }
}
</style>
