import useHttp from './hooks/useHTTP.js';
import MealItem from './MealItem.jsx';
import Error from './Error.jsx';

const requestConfig = {
    method: 'GET'
};

export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className='center'>Fetching meals...</p>;
    }

    if (error) {
        return <Error 
            title="Failed to fetch meals" 
            message={error.toString()}
        />;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}
