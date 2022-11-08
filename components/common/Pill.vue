<template>
  <button
    class="inline-flex justify-center items-center space-x-1 px-6 py-1 text-sm font-medium uppercase tracking-wide rounded-full border"
    :class="{
      'bg-[#E5F6FA] text-[#20A0BC] border-[#20A0BC]': pending,
      'bg-[#FFF0F0] text-[#F02323] border-[#F02323]': unverified,
      'bg-[#E6F9E9] text-[#20BC39] border-[#20BC39]': verified,
    }">
    <slot name="prepend">
      <span>
        <svg-icon v-if="pending" name="timer" class="!w-5 !h-5" />
        <svg-icon v-else-if="verified" name="check-circle" class="!w-5 !h-5" />
        <svg-icon
          v-else-if="unverified"
          name="do-not-disturb"
          class="!w-5 !h-5" />
      </span>
    </slot>
    <span class="pt-1">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'Pill',

  props: {
    variant: {
      type: String,
      default: '',
    },
    sm: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: Boolean,
      default: false,
    },
    xl: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    pending() {
      return this.variant === 'pending'
    },
    verified() {
      return this.variant === 'verified'
    },
    unverified() {
      return this.variant === 'unverified'
    },
  },
}
</script>
