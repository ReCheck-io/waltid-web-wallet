<template>
  <div class="w-full min-h-screen flex">
    <div
      class="left-side py-8 px-10 w-full max-w-full lg:max-w-[52%] bg-white flex flex-col justify-between">
      <div class="mt-36 mb-20 md:px-8 xl:px-28 flex flex-col gap-6">
        <div class="mb-8">
          <h1 class="mb-3 text-[40px] font-medium text-dark leading-[48px]">
            Welcome <span>👋</span> <br />
            Register to EBSI
          </h1>
          <p class="text-base font-medium text-gray-base leading-[19px]">
            Create account to start using EBSI.
          </p>
        </div>

        <form @submit="register" class="flex flex-col gap-6">
          <BaseInput
            name="email"
            type="email"
            :label="$t('LOGIN.EMAIL')"
            placeholder="Enter your email address"
            v-model="email" />
          <BaseInput
            name="password"
            type="password"
            :label="$t('LOGIN.PASSWORD')"
            placeholder="Enter your password"
            v-model="password" />
          <BaseInput
            name="rePassword"
            type="password"
            :label="$t('LOGIN.RE_PASSWORD')"
            placeholder="Enter your password"
            v-model="rePassword" />
          <BaseCheckbox
            id="terms"
            v-model="terms"
            :inputValue="true"
            label="I agree to the Terms & Conditions and Privacy Policy"
            class="my-2" />

          <BaseButton variant="primary" type="submit">
            {{ $t('LOGIN.CREATE_ACCOUNT') }}
          </BaseButton>

          <p class="font-medium text-gray-dark">
            Have an Account?
            <a href="/" class="text-primary">{{ $t('LOGIN.LOG_IN') }}</a>
          </p>
        </form>
      </div>

      <footer class="md-h:pb-8 text-center">
        <p class="text-gray-base">
          Copyright {{ currenYear }} &copy; EBSI Inc.
        </p>
        <a href="/" class="text-gray-dark">Privacy Policy</a>
      </footer>
    </div>
    <div
      class="py-8 px-10 w-full max-w-[48%] bg-light hidden lg:flex relative justify-end">
      <img
        alt="Laptop Illustration"
        src="~assets/images/laptop-mockup.png"
        class="absolute right-0 bottom-0"
        width="750px"
        height="750px" />
    </div>
  </div>
</template>

<script>
import BaseCheckbox from '../components/common/BaseCheckbox.vue'
import BaseButton from '../components/common/BaseButton.vue'
import BaseInput from '../components/common/BaseInput.vue'

export default {
  name: 'RegisterPage',
  layout: 'auth',
  auth: false,

  components: {
    BaseCheckbox,
    BaseButton,
    BaseInput,
  },

  head() {
    return {
      title: 'Register - EBSI Issuer',
    }
  },

  data() {
    return {
      terms: false,
      email: '',
      password: '',
      rePassword: '',
      errorMessage: '',

      currenYear: new Date().getFullYear(),
    }
  },

  methods: {
    async register(event) {
      event.preventDefault()

      try {
        const res = await this.$axios.post(
          'http://127.0.0.1:8080/api/auth/signup',
          {
            email: this.email,
            password: this.password,
            id: this.email,
            token: 'string',
            ethAccount: 'string',
            did: 'string',
          },
        )
        console.log(res, 'Sign up successful!')
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
        this.errorMessage = e.response.data
      }
    },
  },
}
</script>
