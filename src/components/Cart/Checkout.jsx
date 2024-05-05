import classes from './Checkout.module.css';
import {useRef, useState} from 'react';


const Checkout = (props) => {
    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        phone: true,
        email: true
    });
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        
        const nameIsValid = enteredName.trim() !== '';
        const addressIsValid = enteredAddress.trim() !== '';
        const phoneIsValid = enteredPhone.length >= 10;
        const emailIsValid = enteredEmail.includes('@');

        const formIsValid = nameIsValid && addressIsValid && phoneIsValid && emailIsValid;

        setFormInputsValidity({
            name: nameIsValid,
            address: addressIsValid,
            phone: phoneIsValid,
            email: emailIsValid
        });

        const userData = {
            name: enteredName,
            address: enteredAddress,
            phone: enteredPhone,
            email: enteredEmail
        }
        
        if(!formIsValid){
            return;
        }

        props.onConfirm(userData);
    }

    const nameInputClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const addressInputClasses = `${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`;
    const phoneInputClasses = `${classes.control} ${formInputsValidity.phone ? '' : classes.invalid}`;
    const emailInputClasses = `${classes.control} ${formInputsValidity.email ? '' : classes.invalid}`;

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' 
                ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Name cannot be empty!</p>}
            </div>
            <div className={addressInputClasses}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' 
                ref={addressInputRef}/>
                {!formInputsValidity.address && <p>Address cannot be empty!</p>}
            </div>
            <div className={phoneInputClasses}>
                <label htmlFor='phone'>Phone Number</label>
                <input type='text' id='phone' 
                ref={phoneInputRef}/>
                {!formInputsValidity.phone && <p>Should be atleast 10 digits long!</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id='email'
                ref={emailInputRef}/>
                {!formInputsValidity.email && <p>Email should be valid!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;