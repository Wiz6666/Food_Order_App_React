{/* 
  每个Meal 会有一个MealItem
  然后每个信息里面自带 id, name, price, description, image
*/}

import Button from './UI/Button.jsx';

export default function MealItem({ meal }) {
    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>

                <p className="meal-item-actions">
                    <Button> Add to Cart </Button>
                </p>
            </article>
        </li>
    );
}