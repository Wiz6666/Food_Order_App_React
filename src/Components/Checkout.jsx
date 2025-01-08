import { useContext } from "react";
import CartContext from './store/CartContent.jsx';
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import UserProgressContext from './store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';
import useHttp from './hooks/useHTTP.js';
import Error from './Error.jsx';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }
    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    async function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        try {
            await sendRequest(JSON.stringify({
                order: {
                    customer: customerData,
                    items: cartCtx.items,
                    total: cartTotal
                }
            }));
            
            // 成功提交后不要立即隐藏和清空
            // 让用户看到成功信息后再处理
        } catch (err) {
            // 错误已经在 useHttp 中处理了
        }
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Cancel
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span className="center">Sending order...</span>;
    }

    if (data && !error) {
        const orderData = data.order || data;
        return (
            <Modal 
                open={userProgressCtx.progress === 'checkout'} 
                onClose={handleFinish}
            >
                <h2>Order sent successfully!</h2>
                <p>Your order has been sent successfully!</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal 
            open={userProgressCtx.progress === 'checkout'} 
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                
                <Input 
                    label="Full Name" 
                    id="name" 
                    name="name" 
                    type="text" 
                    required 
                />
                <Input 
                    label="E-mail Address" 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                />
                <Input 
                    label="Street" 
                    id="street" 
                    name="street" 
                    type="text" 
                    required 
                />
                <div className="control-row">
                    <Input 
                        label="Postal Code" 
                        id="postal-code" 
                        name="postal-code" 
                        type="text" 
                        required 
                    />
                    <Input 
                        label="City" 
                        id="city" 
                        name="city" 
                        type="text" 
                        required 
                    />
                </div>
                {error && <Error title="Failed to send order" message={error.toString()} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}

