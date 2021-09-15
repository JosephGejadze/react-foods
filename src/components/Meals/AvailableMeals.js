import { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://reactmeals-f07d1-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: parseFloat(data[key].price),
          });
        }
        setMeals(loadedMeals);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );

  if (error)
    return (
      <section className={classes.loading}>
        <p>Whoops... something went wrong :'(</p>
      </section>
    );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem {...meal} key={meal.id} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
