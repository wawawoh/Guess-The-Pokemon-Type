import React, {  useEffect, useState } from "react"
import { chosenTypeContext } from "./chosenTypeContext"

import TypeSection from "./TypeSection"


function Game() {
    const [image,setImage] = useState("")
    const [name, setName] = useState("")
    const [pokemonType, setPokemonType] = useState<string[]>([])
    const [chosenType, setChosenType] = useState <string[]>([])
    const [displayType, setDisplaytype] = useState<string[]>([""])
    const [score, setScore] = useState<boolean[]>([])
    
    
     
    interface insideType {
        name: string,
        url:string
    }
    interface pokemonType {
                slot: number,
                type: insideType


            }
            // when game starts 
            useEffect(()=> {
                if (pokemonType.length == 1) {
                    setChosenType([""])
                } else {
                    setChosenType(["",""])
                }
                
                console.log(displayType, "the amount of types to display")


            },[pokemonType])
            useEffect(()=> {
                setDisplaytype(chosenType)
            },[chosenType])

useEffect(()=> {
    console.log("the score is", score)
    // setChosenType((prev)=> changingDisplay(prev))
}, [score])
 
    const changingDisplay = () => {
        console.log(pokemonType.length ===1, "if length is qeual to 1")
       if (pokemonType.length === 1) {
        if (!pokemonType.includes(displayType[0]) ) {
            setDisplaytype([pokemonType[0]])
            return
           
        }
       } else {
        console.log("longet than 2 types")
            setDisplaytype((prev)=> indexChanger(prev))
            console.log("this is the display type", displayType)
       }
    }
    const indexChanger =(displayType:string[]) => {
        const newArray = [...displayType]
        newArray.forEach((el,index) => {
            if (!pokemonType.includes(el)) {
              if (index === 0) {
                newArray[0] =( pokemonType.find((el) => el !== displayType[1] )! )
              } else {
                newArray[1] =( pokemonType.find((el) => el !== displayType[0])! )

              }

            }
            
        }
        
    );
    console.log("here is the new array,", newArray)
    return newArray
    }
    

    async function getPokemon(id: number) {
        try {
            // console.log(id)
           const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          
           if (!response.ok) {
            throw new Error("unable to fetch pokemon-id is bad")
           } else {
            const pokemon = await response.json()
            
            
            const types = pokemon.types.map((current: pokemonType) => current.type.name);
setPokemonType(types);

// pokemon.types.forEach((current:pokemonType) => {
//                 // console.log("this is the current type being uploaded", current.type.name)
//                 setPokemonType((prev)=> [...prev, current.type.name])
                
//             }); THE OLD VERSION FIND OUT WHY IT DID NOT WORK?????????
            console.log(pokemon.types)
            setImage(pokemon.sprites.front_default)
            setName(pokemon.name)
           
           
           }

        } catch (error) {
            console.error(error)
        }
        
    }
    useEffect(()=> {
        getPokemon(Math.floor((Math.random()* 1024) +1))

    },[])

    // this one is causing problems
    
    const handleRemovingType = (item:string,) => {
        setChosenType((prev) => prev.map((currentItem, )=> currentItem == item ? "" : currentItem))
    }
    const handleSubmitType = () => {
        const temp = chosenType.map((type,index)=> {
            console.log("the current type is", type)
            console.log("the pokemon types are", pokemonType)
            console.log(pokemonType[index])
            if (pokemonType.includes(type)) {
                return true
            } else return false
        })
        setScore(temp)
        changingDisplay()

    }
    const determineScoreTruth = (index:number) => {
        if (score[index] ) 
            {return "correct-display"

            } else {
                return "incorrect-display"
            }
    } 
   
    
    return (
        <div>
            {image && (
                <img src={image} alt="" />

            )}
            
            
            <h2>{name}</h2>

           {displayType &&  (displayType.map ((item:string,index:number)=> (
            
            
                <p 
                className={score.length ===0 ? "normal-display" : determineScoreTruth(index)}
                 onClick={()=>  handleRemovingType(item)} key={index}>type{index}: {item}</p>
           
            )))}
            <p>{pokemonType[0]}</p>
            {pokemonType[1] && (
                <p>{pokemonType[1]}</p>
            )}
            <button onClick={handleSubmitType}>Submit</button>
            {/* where all the types are displayed */} 
            <chosenTypeContext.Provider value={{chosenType, setChosenType, score}}>

       
           <TypeSection />
                </chosenTypeContext.Provider>
        </div>

        
    )

}
export default Game