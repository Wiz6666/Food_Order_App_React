import { useContext } from "react";
import CartContext from './store/CartContent.jsx';
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import UserProgressContext from './store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity, 0
    )
    const userProgressCtx = useContext(UserProgressContext);


    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleConfirm() {
        userProgressCtx.showOrderSummary();
    }

    function handleSubmit(event){
        event.preventDefault(); //这里先阻止表单的默认行为,然后我们可以开始要求表单提交时发生什么了
        console.log(event.target);

        //先验证表单信息
        
        //确保得到了输入的值
    }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>
                Total Amount: {currencyFormatter.format(cartTotal)}
            </p>

            <Input label="Full Name" id="full-name" type="text" />
            <Input label="E-mail Address" id="email" type="email" />
            <Input label="Phone" id="phone" type="tel" />

            <div className="control-row">
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm Order</Button>
            </p>
        </form>
    </Modal>
}

