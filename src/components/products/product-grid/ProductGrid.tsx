import { IComponent } from '@/interfaces/product.interface'
import { ProductGridItem } from './ProductGridItem'

interface IProps {
  products: IComponent[]
  isPresentation?: boolean
}
export const ProductGrid = ({ products, isPresentation }: IProps) => {
  return (
    <div className='flex flex-wrap gap-4 mb-10'>
      {products.map((product) => (
        <ProductGridItem
          product={product}
          key={product.id}
          isPresentation={isPresentation}
        />
      ))}
    </div>
  )
}
