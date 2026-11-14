import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromChefClaude, getRecipeFromMistral } from "./ai"



export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)

      function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    const [recipe, setRecipe] = React.useState("")

async function getRecipe() {
    try {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        console.log("Recipe received:", recipeMarkdown)
        setRecipe(recipeMarkdown)
    } catch (err) {
    console.error("HF Error:", err)
}
}
    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                     getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}