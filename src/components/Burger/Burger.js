
import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    /* Object keys takes the the key values of an object
    in this case its meat, cheese ect */
    let transformedIngredients = Object.keys(props.ingredients)
    /** Mapping keys: cheese, bacon, salad, meat */
    .map(igKey => {
        console.log(igKey);
    /** Array(3) will return an array with 3 empty spaces arrays
     * where you can map each space a such so if there are two cheeses
     * it will return two BurgerIngredient with type of 'cheese'  
     *  spread options will extract the arrays to one array so it will be 
     * [undefined, undefined, undefined]
     * */    
        return [...Array(props.ingredients[igKey])].map((_, i)=> {
           return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    /* The reduce function will reduce the arrays of arrays to an array of objects */

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
           {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;