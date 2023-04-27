import { Brand } from 'src/app/Core/interface/brand';
import { Category } from './category';
import { Subcategory } from './subcategory';


export interface Cartproduct2 {
    subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}
