export type CartType = {
  products: {
    price: number
    quantity: number
    title: string
    total: number
  }[] | undefined
  total: number
  totalProducts: number
}