export function getProductById (products, id) {
  return products.find((product) => {
    return product.id === id
  })
}

// utils to delay promise
export function wait (ms) {
  return (x) => {
    return new Promise(resolve => setTimeout(() => resolve(x), ms))
  }
}
