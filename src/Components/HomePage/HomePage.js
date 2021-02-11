import React, { useState, useEffect } from "react"
// import { allRecipes } from "../../Data/DummyFeed"
import { Link } from "react-router-dom"
import { IoMdAddCircle } from "react-icons/io"
import { RiPencilFill } from "react-icons/ri"
import { AiFillDelete } from "react-icons/ai"
import AddRecipePopup from "../AddRecipePopup/AddRecipePopup"

import "./HomePage.css"

const HomePage = (props) => {

    const backendUrl = "http://localhost:4999"

    const [clickedOnAdd, setClickedOnAdd] = useState(false)
    const [allRecipeDetails, setAllRecipeDetails] = useState([])
    const [recipeAdded, setRecipeAdded] = useState(false)
    const [currentEditRecipe, setCurrentEditRecipe] = useState({})
    const loggedIn = props.location.viaLogin

    useEffect(() => console.log(loggedIn),[])

    useEffect(() => {
        fetch(backendUrl+"/api/getAllRecipes")
        .then(data => data.json())
        .then(json => {
            console.log(26, json)
            setAllRecipeDetails(json)
        })
    },[recipeAdded])

    const handleAddRecipe = (value) => {
        setClickedOnAdd(value)
    }

    const checkRecipeAdded = value => {
        setRecipeAdded(value)
    }

    const handleRecipeEdit = (uid) => {
        fetch(backendUrl+"/api/getCurrentRecipe?uniqueId="+uid)
        .then(data => data.json())
        .then(json => setCurrentEditRecipe(json))
    }

    const changeRecipeData = e => {
        let value = e.target.value
        let name = e.target.name
        setCurrentEditRecipe(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleDeleteIngredients = (index) =>  {
        let data = currentEditRecipe.ingredients
        data.splice(index, 1)
        // console.log(64, data)
        setCurrentEditRecipe(prev => {
            return {
                ...prev,
                ingredients : data
            }
        })
    }

    const handleDeleteSteps = (index) => {
        
        let data = currentEditRecipe.steps
        data.splice(index, 1)
        // console.log(64, data)
        setCurrentEditRecipe(prev => {
            return {
                ...prev,
                steps : data
            }
        })
    }

    const handleUpdateRecipeDatabase = () => {
        fetch(backendUrl+"/api/updateRecipe", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeName: currentEditRecipe.recipeName,
                ingredients: currentEditRecipe.ingredients,
                steps: currentEditRecipe.steps,
                uniqueId: currentEditRecipe.uniqueId
            })
        }).then(data => data.json())
        .then(json => {
            console.log(json)
            setRecipeAdded(true)
        })
        setRecipeAdded(false)
        setCurrentEditRecipe({})
    }

    return (
        <div className="allRecipes-root">
            <div className="allRecipes-main">
                <p>All recipes</p>
                {loggedIn ? <div className="allRecipes-div">
                    { allRecipeDetails.length>0 &&  allRecipeDetails.map((recipe, index) => {
                        return (
                            <div className="singleRecipe-div" key={recipe.uniqueId}>
                                <p className="singleRecipe-name">{ recipe.recipeName }</p>
                                <p className="singleRecipe-otherPTags">Ingredients: </p>
                                <ul className="singleRecipe-ingredients">
                                    { recipe.ingredients.map((item, ingredientIndex) => {
                                        return (
                                            <li key={ingredientIndex}>{item}</li>
                                        )
                                    }) }
                                </ul>
                                <p className="singleRecipe-otherPTags">Steps to prepare</p>
                                <ul className="singleRecipe-steps">
                                    { recipe.steps.map((item, stepsIndex) => {
                                        return (
                                            <li key={stepsIndex}>{item}</li>
                                        )
                                    }) }
                                </ul>
                                <p className="singleRecipe-otherPTags">Chef: <span className="singleRecipe-chef">{ recipe.chefName }</span></p>
                                <RiPencilFill className="allRecipes-editIcon" onClick={() => handleRecipeEdit(recipe.uniqueId)}/>
                            </div>
                        )
                    }) }
                </div>
                :
                <p style={{marginTop:'15%', fontSize:'20px', fontFamily:"'Noto Sans JP', sans-serif"}}>Please login from <Link to="/login">here</Link> </p>}
            </div>
            <div>
                {loggedIn && <IoMdAddCircle  className="homepage-addIcon" onClick={() => handleAddRecipe(true)}/>}
            </div>
             <AddRecipePopup clickedOnAdd={clickedOnAdd} checkRecipeAdded={checkRecipeAdded} handleAddRecipe={handleAddRecipe}/>
             { Object.keys(currentEditRecipe).length>0  && 
                <div className="handleEditPopup">
                    <div className="handleEditPopup-content">
                        <p>Recipe Name</p>
                        <input type="text" value={currentEditRecipe.recipeName} onChange={changeRecipeData} name="recipeName"/>
                    </div>
                    <div>
                        <p>Ingredients</p>
                        <ul>
                            { currentEditRecipe.ingredients.map((item, index) => {
                                return (
                                    <li key={index}>{item}<span className="deleteIcon"><AiFillDelete onClick={() => handleDeleteIngredients(index)}/></span></li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div>
                        <p>Steps</p>
                        <ul>
                            { currentEditRecipe.steps.map((item, index) => {
                                return (
                                    <li key={index}>{item}<span className="deleteIcon"><AiFillDelete onClick={() => handleDeleteSteps(index)}/></span></li>
                                )
                            }) }
                        </ul>
                    </div>
                    <button className="editRecipeConfirm" onClick={handleUpdateRecipeDatabase}>Confirm changes</button>
                </div>
             }
        </div>
    )
}

export default HomePage;