<template>
  <div>
    <header
      class="absolute inset-x-0 top-0 z-10 w-full py-8 px-10 flex items-center justify-between">
      <EbsiLogo />
      <div class="h-fit hidden md:flex items-center justify-center space-x-5">
        <p class="text-base font-normal text-gray-dark">Need Help?</p>
        <span class="flex items-center">
          <svg-icon name="forum" class="w-6 h-6 mr-2 text-gray-dark" />
          <a
            href="/"
            class="flex text-base font-medium text-dark tracking-[-0.01em]">
            Contact Support
          </a>
        </span>
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
import EbsiLogo from '../components/EbsiLogo.vue'

export default {
  components: {
    EbsiLogo,
  },
}
</script>
