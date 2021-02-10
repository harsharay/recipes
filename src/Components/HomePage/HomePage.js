import React, { useState, useEffect } from "react"
import { allRecipes } from "../../Data/DummyFeed"
import { IoMdAddCircle } from "react-icons/io"

import "./HomePage.css"

const HomePage = () => {

    const [clickedOnAdd, setClickedOnAdd] = useState(false)
    const [recipeDetails, setRecipeDetails] = useState({
        recipeName: "",
        ingredients: "",
        steps: ""
    })
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    useEffect(() => {
        console.log(allRecipes)
    },[])

    const handleAddRecipe = () => {
        setClickedOnAdd(true)
    }

    const handleRecipeDetailsChange = e => {
        let value = e.target.value
        let name = e.target.name
        setRecipeDetails(prevValue => {
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    const handleAddIngredients = () => {
        if(recipeDetails.ingredients.length > 0) {
            setIngredients([...ingredients, recipeDetails.ingredients])
            setRecipeDetails(prev => {
                return {
                    ...prev,
                    ingredients : ""
                }
            })
        }
    }

    const handleAddSteps = () => {
        if(recipeDetails.steps.length > 0) {
            setSteps([...steps, recipeDetails.steps])
            setRecipeDetails(prev => {
                return {
                    ...prev,
                    steps : ""
                }
            })
        }
    }

    const handleClosePopup = () => {
        setClickedOnAdd(false)
        setRecipeDetails(prev => {
            return {
                ...prev,
                recipeName: "",
                ingredients: "",
                steps: ""
            }
        })
        setIngredients([])
        setSteps([])
    }

    return (
        <div>
            <div className="allRecipes-main">
                <p>All recipes</p>
                <div className="allRecipes-div">
                    { allRecipes &&  allRecipes.map((recipe, index) => {
                        return (
                            <div className="singleRecipe-div" key={index}>
                                <p className="singleRecipe-name">{ recipe.name }</p>
                                <p className="singleRecipe-otherPTags">Ingredients: </p>
                                <ul className="singleRecipe-ingredients">
                                    { recipe && recipe.Ingredients.map((item, ingredientIndex) => {
                                        return (
                                            <li key={ingredientIndex}>{item}</li>
                                        )
                                    }) }
                                </ul>
                                <p className="singleRecipe-otherPTags">Steps to prepare</p>
                                <ul className="singleRecipe-steps">
                                    { recipe && recipe.Steps.map((item, stepsIndex) => {
                                        return (
                                            <li key={stepsIndex}>{item}</li>
                                        )
                                    }) }
                                </ul>
                                <p className="singleRecipe-otherPTags">Chef: <span className="singleRecipe-chef">{ recipe.chef }</span></p>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <div>
                <IoMdAddCircle  className="homepage-addIcon" onClick={handleAddRecipe}/>
            </div>

            { clickedOnAdd && 
                <div className="addRecipe-popup">
                    <p>Add a recipe</p>
                    <div className="addRecipe-content">
                        <div className="addRecipe-form">
                            <div className="addRecipe-name">
                                <p>Recipe Name</p>
                                <input type="text" onChange={handleRecipeDetailsChange} name="recipeName" value={recipeDetails.recipeName}/>
                            </div>
                            <div className="addRecipe-items">
                                <p>Items</p>
                                <div className="addRecipe-items-inline">
                                    <input type="text" onChange={handleRecipeDetailsChange} name="ingredients" value={recipeDetails.ingredients}/>
                                    <button onClick={handleAddIngredients}>Add</button>
                                </div>
                            </div>
                            <div className="addRecipe-steps">
                                <p>Steps</p>
                                <div className="addRecipe-items-inline">
                                    <input type="text" onChange={handleRecipeDetailsChange} name="steps" value={recipeDetails.steps}/>
                                    <button onClick={handleAddSteps}>Add</button>
                                </div>
                            </div>
                            <button className="addRecipe-addButton">Add this recipe</button>
                        </div>
                        <div className="addRecipe-preview">
                            { (recipeDetails.recipeName.length === 0 && ingredients.length === 0  && steps.length === 0)  && 
                                <p className="addRecipe-preview-header">Preview</p> 
                            }
                            { recipeDetails.recipeName.length > 0  && 
                                <p className="singleRecipe-name preview-Name">{ recipeDetails.recipeName }</p>
                            }
                            { ingredients.length > 0  && 
                                <div className="preview-ingredients">
                                    <p className="singleRecipe-otherPTags">Ingredients: </p>
                                    <ul className="singleRecipe-ingredients">
                                        { ingredients.map((item, ingredientIndex) => {
                                            return (
                                                <li key={ingredientIndex}>{item}</li>
                                            )
                                        }) }
                                    </ul>
                                </div>
                            }
                            { steps.length > 0 &&
                                <>
                                    <p className="singleRecipe-otherPTags">Steps to prepare</p>
                                    <ul className="singleRecipe-steps">
                                        { steps.map((item, stepsIndex) => {
                                            return (
                                                <li key={stepsIndex}>{item}</li>
                                            )
                                        }) }
                                    </ul>
                                </>
                            }
                        </div>
                    </div>
                    <p class="popup-close" onClick={handleClosePopup}>Close</p>
                </div> 
            }
        </div>
    )
}

export default HomePage;