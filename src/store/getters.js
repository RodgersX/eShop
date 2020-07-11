export const productGetters = {
  allProducts: (state, getters) => {
    return state.products
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p._id === id)[0]
    } else {
      return state.product
    }
  }
}

export const userGetters = {
  allUsers: (state, getters) => {
    return state.users
  },
  isLoggedIn: (state) => {
    return !!state.token
  },
  authStatus: (state) => {
    return state.status
  },
  loading (state) {
    return state.showLoader
  },
  userById: (state, getters) => id => {
    if (getters.allUsers.length > 0) {
      return getters.allUsers.filter(p => p._id === id)[0]
    } else {
      return state.user
    }
  }
}

export const salesGetters = {
  allOrders: (state, getters) => {
    return state.sales
  },
  orderById: (state, getters) => id => {
    if (getters.allSales.length > 0) {
      return getters.allSales.filter(s => s._id === id)[0]
    } else {
      return state.sale
    }
  }
}
