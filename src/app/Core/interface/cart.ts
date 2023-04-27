import { Products } from "./products"

export interface Cart {
    _id: string
    cartOwner: string
    products: Products[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}
