<template>
  <nuxt-link to="/">
    <img
      src="/ebsi-logo.svg"
      alt="EBSI Logo"
      class="w-full"
      :class="{
        'min-w-[102px] max-w-[102px]': size === 'small',
        'min-w-[132px] max-w-[132px]': size === 'large',
      }" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'EbsiLogo',

  props: {
    size: {
      type: String,
      default: 'large',
    },
  },
}
</script>
