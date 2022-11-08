/* eslint-disable import/prefer-default-export */

export const convertDocType = (type) => {
  let str = { label: '', icon: 'null' }

  switch (type) {
    case 'VerifiableId':
      str = { label: 'ID Card', icon: 'id-card' }
      break
    case 'VerifiableDiploma':
      str = { label: 'Diploma', icon: 'null' }
      break
    case 'VerifiableVaccinationCertificate':
      str = { label: 'Vaccination Certificate', icon: 'null' }
      break
    case 'ProofOfResidence':
      str = { label: 'Proof Of Residence', icon: 'null' }
      break
    case 'ParticipantCredential':
      str = { label: 'Participant Credential', icon: 'null' }
      break
    case 'Europass':
      str = { label: 'Europass', icon: 'null' }
      break
    case 'OpenBadgeCredential':
      str = { label: 'Open Badge Credential', icon: 'null' }
      break
    default:
      return { label: 'N/A', icon: 'null' }
  }

  return str
}
