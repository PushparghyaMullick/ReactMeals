import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import {useEffect, useCallback, useState} from 'react';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMeals = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try{
            const response = await fetch('https://react-meals-http-238a7-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log(data)

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }

            setMeals(loadedMeals);
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
        setIsLoading(false);
    }, [])

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    if(isLoading){
        return (
            <section className={classes.mealsLoading}>
                <p>Loading Available Meals...</p>
            </section>
        );
    }

    if(error){
        return (
            <section className={classes.mealsError}>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {meals.map(meal => (
                        <MealItem 
                            key={meal.id}
                            id={meal.id}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price}
                        />
                    ))}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;