import React, {useContext, useState, useCallback} from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [showForm, setShowForm] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const cartCtx = useContext(CartContext);

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
                // The bind method is used to bind the item.id to the first argument of the function. This is done so that the function is not executed immediately when the component is rendered. Instead, it is executed when the button is clicked.
            ))}
        </ul>
    );

    const cartCloseHandler = () => {
        props.onCartClose();
        setOrderError(null);
        setOrderPlaced(false);
    }

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={cartCloseHandler}>
                Close
            </button>
            {hasItems && <button className={styles.button} onClick={() => setShowForm(true)}>Order</button>}
        </div>
    );

    const orderHandler = async (userData) => {
        setShowForm(false);
        setOrderLoading(true);
        setOrderError(null);
        setOrderPlaced(false);
        try{
            const response = await fetch('https://react-meals-http-238a7-default-rtdb.firebaseio.com/orders.json', {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                    totalAmount: JSON.parse(cartCtx.totalAmount.toFixed(2))
                })
            });
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            console.log(data);
            cartCtx.clearCart();
            setOrderPlaced(true);
        } catch (error){
            console.log(error);
            setOrderError(error.message);
        }
        setOrderLoading(false);
    };

    return (
        <Modal onClick={cartCloseHandler}>
            {cartItems}
            {!orderPlaced && <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>}
            {showForm && <Checkout onCancel={() => setShowForm(false)} onConfirm={orderHandler}/>}
            {orderLoading && <p>Placing order...</p>}
            {orderError && <p>{orderError}</p>}
            {orderPlaced && <p>Order placed successfully!</p>}
            {!showForm && modalActions}
        </Modal>
    );
}

export default Cart;