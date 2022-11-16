<template>
  <tr>
    <td class="py-4 px-6">
      <div class="flex items-center gap-x-3">
        <span
          class="w-10 h-10 flex items-center justify-center rounded-full bg-[#D3E6F8]">
          <svg-icon name="id-card" class="!w-6 !h-6" />
        </span>
        {{ tableData.type?.label || 'N/A' }}
      </div>
    </td>
    <td class="py-4 px-6">
      {{ tableData.nameAndFamilyNameAtBirth || 'N/A' }}
    </td>
    <td class="py-4 px-6">
      {{ tableData.expirationDate || 'N/A' }}
    </td>
    <td class="py-4 px-6">
      {{ tableData.validFrom || 'N/A' }}
    </td>
    <td class="py-4 px-6">{{ tableData.issuanceDate || 'N/A' }}</td>
    <td class="py-4 px-6">
      <Pill :variant="tableData.status">{{ tableData.status }}</Pill>
    </td>
    <td class="py-4 px-6">
      <div class="space-x-3">
        <button
          type="button"
          class="text-gray-dark"
          @click="pushToCredentialPage()">
          <svg-icon name="eye" class="!w-5 !h-5" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import moment from 'moment'
import Pill from './common/Pill.vue'
import { convertDocType } from '../utils'

export default {
  name: 'TableRow',

  components: { Pill },

  props: {
    type: {
      type: Array,
    },
    data: {
      type: Object,
    },
  },

  data() {
    return {
      moment,
      tableData: {},
    }
  },

  methods: {
    pushToCredentialPage() {
      this.$router.push(`/credential?id=${encodeURIComponent(this.data.id)}`)
    },
  },

  mounted() {
    const { credentialSubject, validFrom, issued, issuanceDate, type } =
      this.data
    const credentialType = type[type.length - 1]

    switch (credentialType) {
      case 'VerifiableId':
        this.tableData = {
          ...credentialSubject,
          type: convertDocType(credentialType),
          issuer: this.data?.issuerName
            ? this.data?.issuerName
            : this.data?.issuer,
          status: 'verified',
          issuanceDate: moment(issuanceDate).format('MMM Do YYYY'),
          expirationDate: credentialSubject.expirationDate
            ? moment(credentialSubject.expirationDate).format('MMM Do YYYY')
            : 'Never',
          validFrom: moment(validFrom).format('MMM Do YYYY'),
        }
        break
      case 'VerifiableDiploma':
        this.tableData.fullName = `${credentialSubject?.givenNames} ${credentialSubject?.familyName}`

        this.tableData.endedAtTime = new Date(
          credentialSubject?.awardingOpportunity?.endedAtTime,
        ).toLocaleDateString()
        this.tableData.startedAtTime = new Date(
          credentialSubject?.awardingOpportunity?.startedAtTime,
        ).toLocaleDateString()

        break
      case 'VerifiableVaccinationCertificate':
        this.tableData.fullName = `${credentialSubject?.givenNames} ${credentialSubject?.familyName}`

        break
      case 'ProofOfResidence':
        this.tableData.fullName = `${credentialSubject?.firstNames} ${credentialSubject?.familyName}`
        break
      case 'ParticipantCredential':
        break
      case 'Europass':
        break
      case 'OpenBadgeCredential':
        break

      default:
        console.log('Not supported issueance type!!', this.type, this.data)
        break
    }

    console.log(this.tableData)
  },
}
</script>
