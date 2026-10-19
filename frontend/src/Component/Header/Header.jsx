import React, { useContext } from 'react';
import classes from './Header.module.css';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

const Header = () => {
    const [{ user, basket }] = useContext(DataContext);
    
    const totalItems = basket?.reduce((total, item) => {
        return total + (item.amount || 1);
    }, 0) || 0;

    return (
        <section className={classes.fixed}>
            <section className={classes.header_container}>
                {/* Logo */}
                <div className={classes.logo_container}>
                    <Link to="/">
                        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                    </Link>
                </div>

                {/* Delivery */}
                <div className={classes.delivery}>
                    <SlLocationPin />
                    <div>
                        <p>Deliver to</p>
                        <span>Ethiopia</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className={classes.search}>
                    <select name="" id="">
                        <option value="">All</option>
                    </select>
                    <input type="text" placeholder="Search Product" />
                    <BsSearch size={38} />
                </div>

                {/* Right Side Navigation / Orders / Cart */}
                <div className={classes.order_container}>
                    <div className={classes.language}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US Flag" />
                        <section>
                            <span>EN</span>
                        </section>
                    </div>

                    <Link to={!user ? "/Auth" : "#"}>
                        <div>
                            {user ? (
                                <>
                                    <p>Hello, {user?.email?.split("@")[0]}</p>
                                    <span onClick={() => auth.signOut()}>Sign Out</span>
                                </>
                            ) : (
                                <>
                                    <p>Hello, Sign In</p>
                                    <span>Account & Lists</span>
                                </>
                            )}
                        </div>
                    </Link>

                    <Link to="/orders">
                        <p>Returns</p>
                        <span>& Orders</span>
                    </Link>

                    <Link to="/cart" className={classes.cart}>
                        <BiCart size={35} />
                        <span className={classes.count}>{totalItems}</span>
                    </Link>
                </div>
            </section>
            <LowerHeader />
        </section>
    );
};

export default Header;