import Cart from './Components/Cart.jsx';

import Header from './Components/Header.jsx';
import Meals from './Components/Meals.jsx';
import { CartContextProvider } from './Components/store/CartContent.jsx';
import { UserProgressContextProvider } from './Components/store/UserProgressContext.jsx';
import Checkout from './Components/Checkout.jsx';

function App() {
  return (

    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />

      </CartContextProvider>
    </UserProgressContextProvider >

  );
}

export default App;
