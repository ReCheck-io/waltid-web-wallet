<template>
  <component
    :is="to ? 'nuxt-link' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    class="btn"
    :class="{
      'bg-white text-gray-dark border border-gray-light': clear,
      'bg-primary': primary,
      'bg-green-500': success,
      'bg-red-600': error,

      'py-2': size === 'sm',
      '!py-3.5': size === 'xl',
    }"
    @click="$emit('click')">
    <slot name="prepend"></slot>
    <slot></slot>
    <slot name="append"></slot>
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'success', 'error', 'clear'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'xl',
      validator(value) {
        return ['sm', 'lg', 'xl'].includes(value)
      },
    },
  },
  computed: {
    primary() {
      return this.variant === 'primary'
    },
    success() {
      return this.variant === 'success'
    },
    error() {
      return this.variant === 'error'
    },
    clear() {
      return this.variant === 'clear'
    },
  },
}
</script>
