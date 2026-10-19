import React, { useState, useEffect } from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import { useParams } from 'react-router-dom';  
import ProductCard from '../../Component/Product/ProductCard';
import classes from './Result.module.css';
import axios from 'axios';  
import { productUrl } from '../../Api/EndPoint';
import Loader from '../../Component/Loader/Loader';

const Result = () => {
   const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const { categoryName } = useParams();

useEffect(() => {
   setIsLoading(true);
   console.log("Current category from URL:", categoryName); // Check this in your browser console (F12)
   
   axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
         console.log("API response data:", res.data); // Check if products are returned here
         setResults(res.data);
         setIsLoading(false);
      })
      .catch((err) => {
         console.error("Error fetching category products:", err);
         setIsLoading(false);
      });
}, [categoryName]);

   return (
      <LayOut>
         <section className={classes.container}>
            <h1 style={{ padding: "20px 30px 0 30px", textTransform: "capitalize" }}>Results</h1>
            <p style={{ padding: "10px 30px", color: "#555", textTransform: "capitalize" }}>
               Category / {categoryName}
            </p>
            <hr />
            
            {isLoading ? (
               <Loader />
            ) : (
               <div className={classes.products_container}>
                  {results?.length === 0 ? (
                     <p style={{ padding: "30px" }}>No products found in this category.</p>
                  ) : (
                     results?.map((product) => (
                        <ProductCard 
                           key={product.id}
                           renderAdd={true}
                           product={product}
                        />
                     ))
                  )}
               </div>
            )}
         </section>
      </LayOut>
   );
};

export default Result;