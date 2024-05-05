import React, {useContext, useEffect, useState} from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const [buttonBump, setButtonBump] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((count, item) => {
        return count + item.amount;
    }, 0);
    //The reduce function is used to calculate a single output value from all the elements in the array. In this case we are calculating the total number of items in the cart. curNumber is the current value of the accumulator and item is the current element in the array. The 0 at the end is the initial value of the accumulator.

    const btnClasses = `${styles.button} ${buttonBump ? styles.bump : ''}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setButtonBump(true);
        const timer = setTimeout(() => {
            setButtonBump(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]) 
    //We use the timer to remove the bump effect after 300ms. The return statement is used to clean up the timer when the component is re-rendered. If we don't use the timer, the bump class will remain on the button, so the effect will not be visible the next time the cart is updated.

    return (
        <button className={btnClasses} onClick={props.onShow}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;