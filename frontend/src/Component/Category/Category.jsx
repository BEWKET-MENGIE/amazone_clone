import React from 'react';
import { category_img } from './Category_img';
import CategoryCard from './CategoryCard';
import classes from './Category.module.css';

const Category = () => {  
  return (
    <section className={classes.category_container}>
      {category_img.map((infos, index) => (
        <CategoryCard key={infos.id || index} data={infos} />
      ))}
    </section>
  );
};

export default Category;