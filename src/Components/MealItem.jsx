{/* 
  每个Meal 会有一个MealItem
  然后每个信息里面自带 id, name, price, description, image
*/}
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../Components/store/CartContent.jsx';


export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }
    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>

                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}> Add to Cart </Button>
                </p>
            </article>
        </li>
    );
}