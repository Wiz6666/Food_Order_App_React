{/* 
    Cart 是购物车的组件
    输出购物车数据
*/}
import { useContext } from 'react';
import Modal from './UI/Modal.jsx';
import Button from './UI/Button.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartContext from './store/CartContent.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';


export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);


    return <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
        <h2>your Cart</h2>
        <ul>
            {/* 
                CartContext.items 是购物车里的item
                item 是购物车里的每个item
            */}

            {cartCtx.items.map(item => (
                <li key={item.id}>
                    {item.name} - {item.quantity}
                </li>
            ))}
        </ul>
        <p>Total: {currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={handleShowCheckout}>Go to checkout</Button>
        </p>
    </Modal>
}