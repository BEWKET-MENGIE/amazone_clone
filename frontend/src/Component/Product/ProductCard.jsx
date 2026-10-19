import React, { useContext } from 'react';
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

const ProductCard = ({ product, flex, renderDescription, renderAdd }) => {
    if (!product) {
        return <div className={classes.loading}>Loading...</div>;
    }

    const { title, image, id, price, rating, description } = product;
    const context = useContext(DataContext);
    
    if (!context) {
        console.error("DataContext must be used within a DataProvider");
        return null;
    }
    
    const [{ basket }, dispatch] = context;

    const addToCart = () => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item: {
                title, image, id, price, rating, description
            }
        });
    };

    return (
        <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
            <Link to={`/products/${id}`}>
                <img src={image} alt={title || 'product image'} />
            </Link>
            <div>
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className={classes.title}>{title}</h3>
                </Link>
                {renderDescription && <div style={{ maxWidth: "400px", fontSize: "14px", margin: "5px 0" }}>{description}</div>}
                
                <div className={classes.rating}>
                    <Rating value={rating?.rate || 0} precision={0.1} readOnly size="small" />
                    <span style={{ fontSize: "12px", marginLeft: "5px" }}>{rating?.count}</span>
                </div>
                
                <div style={{ fontWeight: 'bold', fontSize: '18px', margin: '5px 0' }}>
                    <CurrencyFormat amount={price} />
                </div>
                
                {renderAdd && (
                    <button className={classes.button} onClick={addToCart}>
                        Add to cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;