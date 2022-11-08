export const state = () => ({
  initialized: false,
  dids: [],
  currentDid: '',
  defaultChain: '',
})

export const mutations = {
  addDid(state, did) {
    state.dids.push(did)
  },
  removeDid(state, did) {
    state.list.splice(state.dids.indexOf(did), 1)
  },
  setCurrentDid(state, did) {
    state.currentDid = did
    localStorage.setItem('defaultDid', did)
  },
  initialize(state, initialState) {
    state.initialized = true
    state.dids = initialState.dids
    state.defaultChain = initialState.defaultChain
    const defaultDid = localStorage.getItem('defaultDid')
    if (initialState.currentDid != null) {
      state.currentDid = initialState.currentDid
    } else if (initialState.dids.findIndex((i) => i === defaultDid) < 0) {
      const [currentDid] = initialState.dids
      state.currentDid = currentDid
    } else {
      state.currentDid = defaultDid
      console.log('wallet initialized with ', state)
    }
  },
}

export const actions = {
  initialize({ commit }, initialState) {
    commit('initialize', initialState)
  },
}
