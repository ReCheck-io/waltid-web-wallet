<template>
  <div>
    <section
      class="bg-white px-6 py-3 flex items-center justify-between border-b-[1px] border-gray-light/25">
      <button @click="$router.push('/')" class="text-xl font-medium text-dark">
        <svg-icon name="chevron-left" />
        <span>Back</span>
      </button>
      <div class="flex items-center space-x-3">
        <BaseButton size="sm" variant="clear" @click="onCopy">
          Copy
        </BaseButton>
        <BaseButton size="sm" variant="error" @click="deleteCredential">
          {{ $t('CREDENTIAL.DELETE') }}
        </BaseButton>
      </div>
    </section>

    <section class="h-[calc(100vh-62px)] w-full">
      <CredentialView :credential="credential" />
    </section>
  </div>
</template>

<script>
import { copyText } from 'vue3-clipboard'
import BaseButton from '../components/common/BaseButton.vue'

export default {
  name: 'Credential',
  layout: 'viewer',

  components: { BaseButton },

  data() {
    return {
      credentialContent: '',
      coppied: false,
      onDelete: false,
      deleted: false,
    }
  },

  async asyncData({ $axios, query }) {
    // TODO: select DID to use
    const credList = await $axios.$get('/api/wallet/credentials/list', {
      params: { id: query.id },
    })
    // this.credentialContent = credList.list[0]
    const credential = credList.list[0]
    return { credential }
  },

  methods: {
    async deleteCredential() {
      if (this.credential !== null) {
        const delResp = await this.$axios.delete(
          `/api/wallet/credentials/delete/${encodeURIComponent(
            this.credential.id,
          )}`,
        )
        this.onDelete = true
        if (delResp.status === 200) {
          this.onDelete = false
          this.deleted = true
          setTimeout(() => {
            this.$router.back()
          }, 2500)
        }
      }
    },
    onCopy() {
      const copyContent = JSON.stringify(this.credential)
      copyText(copyContent, undefined, (error, event) => {
        if (error) {
          console.log('Can not copy')
          console.log(error)
        } else {
          this.coppied = true
          console.log(event)
        }
      })
    },
  },
}
</script>
