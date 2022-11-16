<template>
  <header
    class="bg-white px-10 w-full flex items-center space-x-16 border-b-[1px] border-gray-light/25">
    <EbsiLogo size="small" />

    <nav class="w-full flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <nuxt-link to="/credentials" class="nav-link">
          My Credentials
        </nuxt-link>
      </div>
      <div class="flex items-center space-x-6">
        <button
          type="button"
          @click="signout"
          class="nav-link flex items-center space-x-2">
          <span class="pt-0.5">Log Out</span>
          <svg-icon name="logout" class="!w-5 !h-5" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import EbsiLogo from './EbsiLogo.vue'

export default {
  name: 'Navbar',

  components: { EbsiLogo },

  methods: {
    signout() {
      this.$auth.reset()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-link {
  @apply pt-6 pb-[22px] -mb-px text-base font-normal text-gray-base border-b-4 border-transparent hover:text-gray-dark hover:border-b-4 hover:border-dark transition-all ease-in;

  &.nuxt-link-exact-active {
    @apply text-gray-dark border-dark;
  }
}
</style>
