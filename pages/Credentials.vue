<template>
  <div>
    <section
      class="bg-white px-4 md:px-28 py-8 flex items-center justify-between mb-8">
      <h1 class="text-5xl font-medium text-dark">My Credentials</h1>
      <div class="flex items-center space-x-3">
        <BaseInput
          name="search"
          class="w-60"
          v-model="search"
          :placeholder="$t('CREDENTIALS.SEARCH')" />
        <BaseButton variant="primary" @click="requestVerifiableID">
          Request Document
        </BaseButton>
      </div>
    </section>

    <section class="h-full px-4 md:px-28 pb-8">
      <p class="font-medium text-gray-dark mb-8">
        Added {{ filteredList.length }} Credentials
      </p>

      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500">
          <thead
            class="text-gray-base uppercase bg-white border-b-[7px] border-light">
            <th scope="col" class="py-7 px-6 text-sm font-medium">Type</th>
            <th scope="col" class="py-7 px-6 text-sm font-medium">Name</th>
            <th scope="col" class="py-7 px-6 text-sm font-medium">
              Expiration Date
            </th>
            <th scope="col" class="py-7 px-6 text-sm font-medium">
              Issued Date
            </th>
            <th scope="col" class="py-7 px-6 text-sm font-medium">
              Date added
            </th>
            <th scope="col" class="py-7 px-6 text-sm font-medium">Status</th>
            <th scope="col" class="py-7 px-6 text-sm font-medium"></th>
          </thead>
          <tbody
            class="mt-10"
            v-for="credential in filteredList"
            :key="credential.id">
            <TableRow
              class="bg-white text-gray-dark border-b-2 text-base font-medium"
              :type="credential.type"
              :data="credential" />
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import BaseButton from '../components/common/BaseButton.vue'
import BaseInput from '../components/common/BaseInput.vue'
import TableRow from '../components/TableRow.vue'
import { convertDocType } from '../utils'

export default {
  name: 'Credentials',

  layout: 'dashboard',

  components: {
    BaseButton,
    BaseInput,
    TableRow,
  },

  head() {
    return {
      title: 'My Credentials - EBSI Issuer',
    }
  },

  data() {
    return {
      search: '',
      credentials: [
        {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://base.uri.vid/vid/contexts/v1',
          ],
          type: ['VerifiableCredential', 'VerifiableID'],
          id: 'urn:uuid:1dee...674e',
          title: 'National ID',
          issuer: 'did:ebsi:EsnW...QEka',
          issuerName: 'Great Government',
          issuanceDate: '2021-06-25T04:46:02Z',
          validFrom: '2021-06-25T04:46:02Z',
          expirationDate: '2022-06-25T04:46:02Z',
          credentialSubject: {
            type: ['NaturalPerson'],
            id: 'did:ebsi:Ef3u...KqGH',
            familyName: 'Mustermann',
            nameAndFamilyNameAtBirth: 'Muster',
            firstName: 'Max',
            personalIdentifier: 'ES/DE/01234567',
            dateOfBirth: '1982-06-07',
            nationality: 'DEU',
            placeOfBirth: 'Hamburg',
            currentAddress: {
              locatorDesignator: '22',
              thoroughfare: 'Arcacia Avenue',
              postName: 'Berlin',
              postCode: '10115',
            },
            gender: 'Male',
            portrait: 'data:image/jp2;base64,',
          },
          credentialStatus: {
            id: 'https://',
            type: 'TrustedCredentialStatus2021',
          },
          credentialSchema: {
            id: 'https://',
            type: 'TrustedSchemaValidator2021',
          },
          evidence: [
            {
              id: 'https://',
              type: ['DocumentVerification', 'PassportVerification'],
              verifier: 'did:ebsi:2962...4a7a',
              subjectPresence: 'Physical',
              documentPresence: 'Physical',
              evidenceDocument: {
                type: 'Passport',
                documentCode: 'P',
                documentNumber: 'SPECI2014',
                documentIssuingState: 'NLD',
                documentExpirationDate: '2031-06-25',
              },
            },
          ],
          proof: {
            type: 'EidasEseal2021',
            created: '2021-06-25T04:46:02Z',
            proofPurpose: 'assertionMethod',
            verificationMethod: 'urn:uuid:4321...42de',
            proofValue: '',
          },
        },
      ],
    }
  },
  computed: {
    filteredList() {
      return this.credentials.filter((credential) => {
        return JSON.stringify(credential)
          .toLowerCase()
          .includes(this.search.toLowerCase())
      })
    },
    currentDid() {
      console.log(this.$store.state.wallet.currentDid)
      return this.$store.state.wallet.currentDid
    },
  },
  methods: {
    getIssuerName(credential) {
      return credential.issuer.name ? credential.issuer.name : credential.issuer
    },
    convertDocType(str) {
      return convertDocType(str)
    },
    async requestVerifiableID() {
      // get the issuer
      console.log('issuers')
      const issuers = await this.$axios.$get('/api/wallet/siopv2/issuer/list')
      console.log(`issuers ${JSON.stringify(issuers[2])}`)

      // the issuer is hardcoded as ReCheck
      this.selectedIssuer = issuers[2].id

      this.selectedIssuerMeta = await this.$axios.$get(
        `/api/wallet/siopv2/issuer/metadata?issuerId=${issuers[2].id}`,
      )

      console.log(
        `selectedIssuersMeta ${JSON.stringify(this.selectedIssuerMeta)}`,
      )
      console.log(
        `this schema ${JSON.stringify(
          this.selectedIssuerMeta.credential_manifests[0].output_descriptors[12]
            .schema,
        )}`,
      )
      // The credential is hardcoded for verifiableID
      this.selectedCredentialSchema =
        this.selectedIssuerMeta.credential_manifests[0].output_descriptors[12].schema

      const location = await this.$axios.$post(
        '/api/wallet/siopv2/initIssuance',
        {
          did: this.currentDid,
          issuerId: this.selectedIssuer,
          schemaIds: [this.selectedCredentialSchema],
          walletRedirectUri: '/Credentials',
        },
      )
      console.log(`init issuance location ${JSON.stringify(location)}`)
      console.log({
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        schemaIds: this.selectedCredentialSchema,
        walletRedirectUri: '/Credentials',
      })
      window.location = location
    },
  },
  async asyncData({ $axios }) {
    // TODO: select DID to use
    const credList = await $axios.$get('/api/wallet/credentials/list')
    console.log(credList)
    const credentials = credList.list
    console.log(credentials)
    return { credentials }
  },
}
</script>
