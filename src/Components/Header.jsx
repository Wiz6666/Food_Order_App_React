import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import { useContext } from 'react';
import CartContext from './store/CartContent.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    console.log(cartCtx);

    const userProgressCtx = useContext(UserProgressContext);
    console.log(userProgressCtx);

    {/* Reduce可以把数组变成单个值 这样计算有多少个item */ }
    {/*
    totalNumberOfItems 是总数
    item 是数组里的每个item
    return totalNumberOfItems + item.quantity; 是返回总数和item的quantity相加
    */}
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;

    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="React Food Weisi" />
                <h1>React Food Weisi</h1>
            </div>


            {/* 等下用着打开购物车 Cart */}
            <nav>
                <Button textOnly onClick={handleShowCart}> Cart ({totalCartItems}) </Button>
            </nav>
        </header>
    );
}
