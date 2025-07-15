import { IComponent } from '@/interfaces/product.interface'
import { ProductGridItem } from './ProductGridItem'

interface IProps {
  products: IComponent[]
}
export const ProductGrid = ({ products }: IProps) => {
  return (
    <div className='flex flex-wrap gap-4 mb-10'>
      {products.map((product) => (
        <ProductGridItem product={product} key={product.id} />
      ))}
    </div>
  )
}
