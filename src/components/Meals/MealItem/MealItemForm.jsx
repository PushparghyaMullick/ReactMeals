import React, {useRef, useState} from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false); return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input label='Amount' input={{
                ref: amountInputRef,
                id: 'quantity_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
}

export default MealItemForm;