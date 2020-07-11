import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'

import { API_BASE } from '@/utils/base-url.config'

import {
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  SET_LOGIN_REQUEST,
  SET_TOKEN,
  SET_USER,
  SET_LOGIN_ERRORS,
  USER_BY_ID,
  USER_BY_ID_SUCCESS,
  USER_DELETE_ACCOUNT,
  USER_DELETE_ACCOUNT_SUCCESS,
  ADD_SALE,
  ADD_SALE_SUCCESS,
  ALL_SALES,
  ALL_SALES_SUCCESS,
  SALE_BY_ID,
  SALE_BY_ID_SUCCESS,
  REMOVE_SALE,
  REMOVE_SALE_SUCCESS
} from './mutation-types'
import { GET_ALL_PRODUCTS, GET_ORDER_BY_ID, ADD_NEW_PRODUCT, } from './action-types'
import { GET_USER_BY_ID } from './action-types'

// @vuese
// Please take time to refer to the rest api documentation https://pengfluf.github.io/rest-api-shop-docs/

Vue.use(VueCookies)

export const productActions = {
  // Getting all products
  [GET_ALL_PRODUCTS] ({ commit }) {
    commit(ALL_PRODUCTS)
    axios.get(`${API_BASE}/products/`).then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data)
    })
  },
  // Getting an individual product
  [GET_ORDER_BY_ID] ({ commit }, payload) {
    commit(PRODUCT_BY_ID)
    axios.get(`${API_BASE}/products/${payload}`).then(response => {
      // console.log(payload, response.data)
      commit(PRODUCT_BY_ID_SUCCESS, response.data)
    })
  },
  // Creating a product
  [ADD_NEW_PRODUCT] ({ commit }, payload) {
    commit(ADD_PRODUCT)
    axios.put(`${API_BASE}/product/v1/products/create`, payload).then(response => {
      Promise.resolve(commit(ADD_PRODUCT_SUCCESS, response.data))
      Vue.$cookies.set('recently_added_item', response.data)
      // location.reload()
    })
  }
}

export const userActions = {
  [GET_USER_BY_ID] ({ commit }, payload) {
    commit(USER_BY_ID)
    axios.get(`${API_BASE}/user/${payload}`).then(response => {
      commit(USER_BY_ID_SUCCESS, response.data)
    })
  },

  [USER_DELETE_ACCOUNT] ({ commit }, payload) {
    commit(USER_DELETE_ACCOUNT)
    axios.patch(`${API_BASE}/user/${payload._id}`, payload).then(response => {
      commit(USER_DELETE_ACCOUNT_SUCCESS, response.data)
      this.$cookies.set('user', response.data)
    })
  },
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(SET_LOGIN_REQUEST)
      axios.post(`${API_BASE}/user/login`, payload)
        .then(res => {
          const token = res.data.token
          const user = {
            _id: res.data._id,
            email: res.data.email
          }

          /* This is how we create a persistent store with vue-cookies
          ** please you can read https://medium.com/js-dojo/how-to-permanently-save-data-with-vuex-localstorage-in-your-vue-app-f1d5c140db69
          */
          Vue.$cookies.set('token', token)
          Vue.$cookies.set('user', user)
          // eslint-disable-next-line dot-notation
          axios.defaults.headers.common['Authorization'] = token

          commit(SET_TOKEN, token, user)
          commit(SET_USER, user)
          resolve(res)
        })
        .catch(err => {
          commit(SET_LOGIN_ERRORS)
          Vue.$cookies.remove('token')
          reject(err)
        })
    })
  },

  register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(SET_LOGIN_REQUEST)
      axios.post(`${API_BASE}/user/signup`, payload)
        .then(res => {
          const token = res.data.token
          const user = {
            userId: res.data._id
          }

          Vue.$cookies.set('token', token)
          Vue.$cookies.set('user', user)
          location.reload()
          // eslint-disable-next-line dot-notation
          axios.defaults.headers.common['Authorization'] = token
          commit(SET_TOKEN, token, user)
          resolve(res)
        })
        .catch(err => {
          commit(SET_LOGIN_ERRORS, err)
          Vue.$cookies.remove('token')
          reject(err)
        })
    })
  },

  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('LOGOUT')
      /** When login the user we must remove all the information we have stored in the cookies and localStorage
       * Including the token **/
      location.reload()
      Vue.$cookies.remove('token')
      Vue.$cookies.remove('user')
      Vue.$cookies.remove('shoppingcart')
      Vue.$cookies.remove('profile')
      // eslint-disable-next-line dot-notation
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

/**
 * There are all the actions that we will be using in the application. Please refer for the REST APII documentstions link
 **/

export const ordersActions = {
  // Viewing all the orders in that admin dashboard and user dashboard
  allOrders ({ commit }) {
    commit(ALL_SALES)
    axios.get(`${API_BASE}/sales/v1/all/sales/`).then(response => {
      commit(ALL_SALES_SUCCESS, response.data)
    })
  },
  orderById ({ commit }, payload) {
    commit(SALE_BY_ID)
    axios.get(`${API_BASE}/sales/v1/sales/${payload}`).then(response => {
      // console.log(payload, response.data)
      commit(SALE_BY_ID_SUCCESS, response.data)
    })
  },
  addOrder ({ commit }, payload) {
    commit(ADD_SALE)
    axios.post(`${API_BASE}/sales/v1/create`, payload).then(response => {
      commit(ADD_SALE_SUCCESS, response.data)
      Vue.$cookies.remove('cart')
      // location.reload()
    })
  },
  removeOrder ({ commit }, payload) {
    commit(REMOVE_SALE)
    axios.delete(`${API_BASE}/sales/v1/delete/sales/${payload}`, payload).then(response => {
      // console.debug('response', response.data)
      commit(REMOVE_SALE_SUCCESS, response.data)
      location.reload()
    })
  }
}
