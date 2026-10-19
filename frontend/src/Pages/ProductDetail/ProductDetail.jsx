import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import LayOut from '../../Component/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/EndPoint';
import ProductCard from '../../Component/Product/ProductCard';
import Loader from '../../Component/Loader/Loader';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <ProductCard
            product={product}
            flex={true}
            renderDescription={true}
            renderAdd={true}
          />
        </div>
      )}
    </LayOut>
  );
};

export default ProductDetail;