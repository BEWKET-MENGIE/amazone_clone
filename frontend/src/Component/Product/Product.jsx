import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import { ClipLoader } from 'react-spinners';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes.loader_container}>
          <ClipLoader color="#febd69" size={50} />
        </div>
      ) : (
        <section className={classes.product_container}>
          {products?.map((singleProduct) => (
            <ProductCard 
              renderAdd={true} 
              product={singleProduct} 
              key={singleProduct.id} 
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;