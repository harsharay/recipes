import React, { useState, useEffect } from "react"
import { IoMdAddCircle } from "react-icons/io"


import "./AddRecipePopup.css"

const AddRecipePopup = ({ clickedOnAdd,checkRecipeAdded,handleAddRecipe }) => {


    const backendUrl = "http://localhost:4999"

    const [recipeDetails, setRecipeDetails] = useState({
        recipeName: "",
        ingredients: "",
        steps: ""
    })
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const [chefName, setChefName] = useState("")
    // const [recipeAdded, setRecipeAdded] = useState(false)

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
            setRecipeDetails(prev => {
            return {
                ...prev,
                recipeName: "",
                ingredients: "",
                steps: ""
            }
        })
        handleAddRecipe(false)
        setIngredients([])
        setSteps([])
    }

    const handleAddRecipeToDatabase = () => {
        if(recipeDetails.recipeName.length >0 && ingredients.length > 0 && steps.length > 0) {
            fetch(backendUrl+"/api/createRecipe", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipeName : recipeDetails.recipeName,
                    ingredients,
                    steps,
                    chefName: "",
                    uniqueId: new Date().getTime()+""
                })
            })
            .then(data => data.json())
            .then(json => {
                console.log(91, json)
                checkRecipeAdded(true)
            })
        } else {
            alert("Add all the details")
        }
        setRecipeDetails({
            recipeName: "",
            ingredients: "",
            steps: ""
        })
        setIngredients([])
        setSteps([])
        checkRecipeAdded(false)
    }

    return (
        <>
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
                                    <button onClick={handleAddIngredients}><IoMdAddCircle /></button>
                                </div>
                            </div>
                            <div className="addRecipe-steps">
                                <p>Steps</p>
                                <div className="addRecipe-items-inline">
                                    <input type="text" onChange={handleRecipeDetailsChange} name="steps" value={recipeDetails.steps}/>
                                    <button onClick={handleAddSteps}><IoMdAddCircle /></button>
                                </div>
                            </div>
                            <button className="addRecipe-addButton" onClick={handleAddRecipeToDatabase}>Add this recipe</button>
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
                    <p className="popup-close" onClick={() => handleClosePopup()}>Close</p>
                </div> 
            }
        </>
    )
}

export default AddRecipePopup;