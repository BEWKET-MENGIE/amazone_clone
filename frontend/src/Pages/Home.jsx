import React, { useEffect, useState } from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import ProductCard from '../../Component/Product/ProductCard';
import Loader from '../../Component/Loader/Loader';
import { axiosInstance } from '../../Api/Axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <div style={{ padding: '20px', background: '#eaeded', minHeight: '80vh' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>Featured Products</h2>
        {loading ? (
          <Loader />
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', 
            gap: '20px',
            maxWidth: '1500px',
            margin: '0 auto'
          }}>
            {products.map((product) => (
              <ProductCard 
                key={product.product_id || product.id}
                product={{
                  id: product.product_id || product.id,
                  title: product.title,
                  image: product.image_url || product.image,
                  price: product.price,
                  rating: product.rating || { rate: 4.5, count: 120 },
                  description: product.description
                }}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default Home;