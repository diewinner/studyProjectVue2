export const state = () => (
  {
    auth: false,
  }
)
export const mutations = {
  userAuth(state) {
    state.auth = true;
  },

}

export const getters = {
  getUserAuth(store) {
    return store.auth
  },
}

export const actions =  {

}
