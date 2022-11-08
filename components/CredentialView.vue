<template>
  <div class="w-full h-full flex">
    <aside class="hidden md:block px-4 h-full w-auto md:min-w-[340px]">
      <p class="py-8 uppercase text-gray-dark">Information</p>

      <ol>
        <li class="p-4 flex items-center justify-between odd:bg-white">
          <span class="font-medium text-gray-base select-none">Card Type</span>
          <span class="font-medium text-gray-dark select-none">
            {{ credentialData.type?.label || 'N/A' }}
          </span>
        </li>
        <li class="p-4 flex items-center justify-between odd:bg-white">
          <span class="font-medium text-gray-base select-none">Issued by</span>
          <span
            class="font-medium text-gray-dark select-none"
            :aria-label="credentialData.issuer"
            :title="credentialData.issuer">
            {{
              credentialData.issuer
                ? credentialData.issuer.substring(0, 20) + '...'
                : ''
            }}
          </span>
        </li>
        <li class="p-4 flex items-center justify-between odd:bg-white">
          <span class="font-medium text-gray-base select-none">
            Expiration Date
          </span>
          <span class="font-medium text-gray-dark select-none">
            {{ credentialData.expirationDate }}
          </span>
        </li>
        <li class="p-4 flex items-center justify-between odd:bg-white">
          <span class="font-medium text-gray-base select-none">Status</span>
          <span class="font-medium text-gray-dark select-none">
            <Pill :variant="credentialData.status">
              {{ credentialData.status }}
            </Pill>
          </span>
        </li>
        <li class="p-4 flex items-center justify-between odd:bg-white">
          <span class="font-medium text-gray-base select-none">
            Issure Date
          </span>
          <span class="font-medium text-gray-dark select-none">
            {{ credentialData.issuedOn }}
          </span>
        </li>
      </ol>
    </aside>

    <div class="w-full h-full bg-white flex">
      <div class="px-8 pt-4 border-r border-gray-light/25">
        <canvas
          :id="'qr-' + credential.id"
          v-show="showQR || !$globals.thumbnail(this.credential)"
          @click="toggleShowQR()"></canvas>
        <p class="text-gray-light">
          That is your unique QR code validation from this Credential
        </p>
      </div>

      <div class="w-full px-10">
        <p class="py-8 uppercase text-gray-dark">Details</p>

        <form action="" class="flex flex-col gap-y-6">
          <div class="flex items-center space-x-8">
            <BaseInput
              label="Name"
              name="firstName"
              v-model="credentialData.firstName"
              disabled
              block />
            <BaseInput
              label="Family Name"
              name="familyName"
              v-model="credentialData.familyName"
              disabled
              block />
          </div>

          <BaseInput
            label="Date of and Family Name at Birth"
            name="nameAndFamilyNameAtBirth"
            v-model="credentialData.nameAndFamilyNameAtBirth"
            disabled
            block />

          <div class="flex items-center space-x-8">
            <BaseInput
              label="Date of Birth"
              name="dateOfBirth"
              v-model="credentialData.dateOfBirth"
              disabled
              block />
            <BaseInput
              label="Place of Birth"
              name="placeofBirth"
              v-model="credentialData.placeOfBirth"
              disabled
              block />
          </div>

          <BaseInput
            label="Current Address"
            name="currentAddress"
            v-model="credentialData.currentAddress"
            disabled
            block />

          <div class="flex items-center space-x-8">
            <BaseInput
              label="Gender"
              name="gender"
              v-model="credentialData.gender"
              disabled
              block />
            <BaseInput
              label="ID"
              name="personalIdentifier"
              v-model="credentialData.personalIdentifier"
              disabled
              block />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import QRious from 'qrious'
import Pill from './common/Pill.vue'
import BaseInput from './common/BaseInput.vue'
import { convertDocType } from '../utils'

export default {
  name: 'CredentialView',

  components: { Pill, BaseInput },

  props: {
    credential: {},
  },

  data() {
    return {
      moment,
      showQR: false,
      credentialData: {},
    }
  },

  mounted() {
    // eslint-disable-next-line no-new
    new QRious({
      element: document.getElementById(`qr-${this.credential.id}`),
      value: JSON.stringify(this.credential),
      size: 300,
    })

    const { credentialSubject, type } = this.credential
    const credentialType = type[type.length - 1]

    switch (credentialType) {
      case 'VerifiableId':
        this.credentialData = {
          ...credentialSubject,
          currentAddress: credentialSubject.currentAddress.length
            ? credentialSubject.currentAddress[0]
            : credentialSubject.currentAddress,
          issuer: this.credential?.issuerName
            ? this.credential?.issuerName
            : this.credential?.issuer,
          status: 'verified',
          issuedOn: moment(credentialSubject.issuanceDate).format(
            'MMM Do YYYY',
          ),
          expirationDate: credentialSubject.expirationDate
            ? moment(credentialSubject.expirationDate).format('MMM Do YYYY')
            : 'Never',
          validFrom: moment(credentialSubject.validFrom).format('MMM Do YYYY'),
        }
        break
      case 'VerifiableDiploma':
        break
      case 'VerifiableVaccinationCertificate':
        break
      case 'ProofOfResidence':
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

    this.credentialData.type = convertDocType(credentialType)
  },

  methods: {
    toggleShowQR() {
      this.showQR = !this.showQR
    },
  },
}
</script>
