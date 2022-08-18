<template>
    <div>
        <h2 class="_animation-fade">{{$t('CREDENTIALS.TITLE')}}</h2>
        <div class="_search">
            <form action="" id="search-form">
                <input name="search-input" type="text" v-model="search" :placeholder="$t('CREDENTIALS.SEARCH')">
            </form>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
            <NuxtLink class="_card d-flex" v-for="credential in filteredList" v-bind:key="credential.id" :to="'/Credential?id='+encodeURIComponent(credential.id)" >
                <div class="col-10 d-flex align-items-center">
                    <img class="w-25 p-3 mb-1"  :src="$globals.thumbnail(credential)" v-if="$globals.thumbnail(credential)"/>
                    <div>
                        <h5 class="mb-1">{{$t('CREDENTIAL.TYPE.' + credential.type[credential.type.length-1])}}</h5>
                        <p class="text-truncate" style="max-width: 12em">by "{{ getIssuerName(credential) }}"</p>
                    </div>
                </div>
                <div class="col d-flex justify-content-end">
                    <i class="bi bi-bookmark-star-fill _icon-active"></i>
                </div>
            </NuxtLink>
        </div>
        <i class="bi  me-2"></i>
       <a href="#copy" class="btn btn-primary col-8 mb-3" @click="requestVerifiableID"><i class="bi bi-files me-3"></i>Request VerifiableID</a>


        <!-- <NuxtLink to="/ValidatedIDCredentialOnly" class="btn btn-primary py-2" style="width: 70%;">
            
        </NuxtLink> -->
    </div>
</template>

<script>

export default {
  name: 'Credentials',
  data() {
    return {
      search: '',
      credentials: [
          {
                     "@context":[
                        "https://www.w3.org/2018/credentials/v1",
                        "https://base.uri.vid/vid/contexts/v1"
                     ],
                     "type":[
                        "VerifiableCredential",
                        "VerifiableID"
                     ],
                     "id":"urn:uuid:1dee...674e",
                     "title":"National ID",
                     "issuer":"did:ebsi:EsnW...QEka",
                     "issuerName":"Great Government",
                     "issuanceDate":"2021-06-25T04:46:02Z",
                     "validFrom":"2021-06-25T04:46:02Z",
                     "expirationDate":"2022-06-25T04:46:02Z",
                     "credentialSubject":{
                        "type":[
                           "NaturalPerson"
                        ],
                        "id":"did:ebsi:Ef3u...KqGH",
                        "familyName":"Mustermann",
                        "nameAndFamilyNameAtBirth":"Muster",
                        "firstName":"Max",
                        "personalIdentifier":"ES/DE/01234567",
                        "dateOfBirth":"1982-06-07",
                        "nationality":"DEU",
                        "placeOfBirth":"Hamburg",
                        "currentAddress":{
                        "locatorDesignator":"22",
                        "thoroughfare":"Arcacia Avenue",
                        "postName":"Berlin",
                        "postCode":"10115"
                      },
                      "gender":"Male",
                        "portrait":"data:image/jp2;base64,"
                      },
                      "credentialStatus":{
                      "id":"https://",
                      "type":"TrustedCredentialStatus2021"
                    },
                    "credentialSchema":{
                    "id":"https://",
                    "type":"TrustedSchemaValidator2021"
                    },
                    "evidence":[{
                      "id":"https://",
                      "type":[
                       "DocumentVerification",
                       "PassportVerification"
                     ],
                     "verifier":"did:ebsi:2962...4a7a",
                     "subjectPresence":"Physical",
                     "documentPresence":"Physical",
                     "evidenceDocument":{
                         "type":"Passport",
                         "documentCode":"P",
                         "documentNumber":"SPECI2014",
                         "documentIssuingState":"NLD",
                         "documentExpirationDate":"2031-06-25"
                      }
                    }],
                    "proof":{
                       "type":"EidasEseal2021",
                       "created":"2021-06-25T04:46:02Z",
                       "proofPurpose":"assertionMethod",
                       "verificationMethod":"urn:uuid:4321...42de",
                       "proofValue":""
                    }
          },
        ],
    }
  },
  computed: {
    filteredList() {
      return this.credentials.filter(credential => {
        return JSON.stringify(credential).toLowerCase().includes(this.search.toLowerCase())
      })
    },
    currentDid () {
        console.log(this.$store.state.wallet.currentDid)
        return this.$store.state.wallet.currentDid
    }
  },
  methods: {
    getIssuerName(credential){
      return credential.issuer.name ? credential.issuer.name : credential.issuer
    },
    async requestVerifiableID(){
      // get the issuer
      console.log("issuers");
      const issuers = await this.$axios.$get("/api/wallet/siopv2/issuer/list");
     console.log("issuers "+ JSON.stringify(issuers[2]));
       
     this.selectedIssuer = issuers[2]["id"]

     this.selectedIssuerMeta = await this.$axios.$get(
        "/api/wallet/siopv2/issuer/metadata?issuerId=" + issuers[2]["id"]
      );

      console.log("selectedIssuersMeta " + JSON.stringify(this.selectedIssuerMeta));
      console.log("this schema " + JSON.stringify(this.selectedIssuerMeta["credential_manifests"][0]["output_descriptors"][12]["schema"]));
      this.selectedCredentialSchema = this.selectedIssuerMeta["credential_manifests"][0]["output_descriptors"][12]["schema"];
      
      const location = await this.$axios.$post('/api/wallet/siopv2/initIssuance', {
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        schemaIds: [ this.selectedCredentialSchema ],
        walletRedirectUri: '/Credentials'
      })
      console.log("init issuance location " + JSON.stringify(location));
      console.log({
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        schemaIds: this.selectedCredentialSchema,
        walletRedirectUri: '/Credentials'
      });
      window.location = location
      // get the verifiable id credential
      // redirect to issuer portal
    }
  },
  async asyncData ({ $axios }) {
    // TODO: select DID to use
    const credList = await $axios.$get("/api/wallet/credentials/list")
    const credentials = credList.list
    return { credentials }
  }
};
</script>
