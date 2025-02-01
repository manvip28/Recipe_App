import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Recipe.css';

const RecipeFilterPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;
    const imageUrl = `http://localhost:4000/uploads/${recipe.image}`;
    return (
        <div className="recipe-container" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="recipe-content">
                <div className="recipe-header">
                    <h1>{recipe.recipeName}</h1>
                    <img src={imageUrl} alt={recipe.recipeName} className="recipe-image"/>
                </div>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h2>Instructions</h2>
                {recipe.instructions.map((instruction, index) => (
                    <p key={index}>{instruction}</p>
                ))}
            </div>
        </div>
    );
};

export default RecipeFilterPage;
