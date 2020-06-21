import * as React from 'react';
import { ProductsRepository } from '../../repositories/ProductsRepository';
import { Product } from '../../models/product';

export enum HomeText {
  emptyMessage = 'No products were found'
}

interface HomeProps {
  productsRepository: ProductsRepository;
}

export const Home: React.FC<HomeProps> = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<Error|null>(null);
  React.useEffect(() => {
    productsRepository.getProducts()
      .then(setProducts)
      .catch(setError);
  }, []);

  const hasProducts = () => products && products.length > 0;

  return (
    <section>
      { error && <p>{error.message}</p> }
      { hasProducts()
        ? products.map(product => <article key={product.handle}>{product.title}</article>)
        : <p>{HomeText.emptyMessage}</p>
      }
    </section>
  );
};
