import { IComponent } from '@/interfaces'
import { ProductGridItem } from './ProductGridItem'

interface IProps {
  products: IComponent[]
}
export const ProductGrid = ({ products }: IProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 mb-10'>
      {products.map((product) => (
        <ProductGridItem product={product} key={product.id} />
      ))}
    </div>
  )
}
