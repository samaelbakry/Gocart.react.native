export type Products = {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

export type Subcategory = {
  _id: string
  name: string
  slug: string
  category: string
}

export type Category = {
  _id: string
  name: string
  slug: string
  image: string
}

export type Brand = {
  _id: string
  name: string
  slug: string
  image: string
}