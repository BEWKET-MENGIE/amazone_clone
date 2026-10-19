import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Category.module.css';

const CategoryCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <h2>{data?.title}</h2>
        <img src={data?.imgLink} alt={data?.title || 'category image'} />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;