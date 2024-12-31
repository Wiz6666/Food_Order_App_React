import Header from './Components/Header.jsx';
import Meals from './Components/Meals.jsx';
import { CartContextProvider } from './Components/store/CartContent.jsx';
import { UserProgressContextProvider } from './Components/store/UserProgressContext.jsx';
import Cart from './Components/Cart.jsx';
function App() {
  return (

    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider >

  );
}

export default App;
