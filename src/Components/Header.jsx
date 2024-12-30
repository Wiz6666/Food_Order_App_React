import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="React Food Weisi" />
                <h1>React Food Weisi</h1>
            </div>


            {/* 等下用着打开购物车 Cart */}
            <nav>
                <Button textOnly> Cart (0) </Button>
            </nav>
        </header>
    );
}
