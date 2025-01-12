import Input from "./UI/Input";
import Button from './UI/Button.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';
import useHttp from './hooks/useHTTPS.js';
import { useContext } from "react";
import CartContext from './store/CartContent.jsx';
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Error from './Error.jsx';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp(
        'http://localhost:3000/orders',
        requestConfig
    );

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity, 0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }
    function handleFinish() {
        cartCtx.clearCart();
        userProgressCtx.hideCheckout();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                }
            })
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order...</span>;
    }
    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === 'checkout'}
                onClose={handleFinish}
            >
                <h2> Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details soon.</p>
                <p>
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text" />
                <Input label="E-mail Address" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>
                {error && <Error title="Failed to submit order" message={error.message || error.toString()} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}

