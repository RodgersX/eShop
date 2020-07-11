import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueCookies from 'vue-cookies'

import { productGetters, userGetters, salesGetters, categoryGetters } from './getters'
import { productMutations, cartMutations, userMutations, salesMutations, categoryMutations } from './mutations'
import { productActions, userActions, ordersActions, categoryActions } from './actions'

Vue.use(Vuex)
Vue.use(VueCookies)

// this.$cookies.config('7d')

// const vuexLocal = new VuexPersistence({
//   key: 'products',
//   storage: window.localStorage
// })

const vuexCookie = new VuexPersistence({
  key: 'shoppingcart',
  restoreState: (key, storage) => Vue.$cookies.get(key),
  saveState: (key, state, storage) =>
    Vue.$cookies.set(key, state, {
      expires: 3
    }),
  modules: ['shoppingcart']
})

// store.js
export default new Vuex.Store({
  strict: false,
  state: {
    cart: [],
    showLoader: false,
    product: {},
    products: [],
    token: Vue.$cookies.get('_token') || '',
    user: {},
    users: [],
    status: '',
    sale: {},
    sales: [],
    category: {},
    categories: []
  },

  mutations:
  // @vuese
  // This is the mutations
   Object.assign({}, productMutations, cartMutations, userMutations, salesMutations, categoryMutations),
  getters: Object.assign({}, productGetters, userGetters, salesGetters, categoryGetters),
  actions: Object.assign({}, productActions, userActions, ordersActions, categoryActions),
  plugins: [vuexCookie.plugin]
})
