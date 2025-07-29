import React, { createContext, useEffect, useState } from "react"

import TypeSection from "./TypeSection"
interface chosenTypeContextValue {
    chosenType: string[];
    setChosenType:React.Dispatch<React.SetStateAction<string[]>>,
    score:boolean[],
    setScore:React.Dispatch<React.SetStateAction<boolean[]>>

}
export const chosenTypeContext = createContext<chosenTypeContextValue> ({
    chosenType: ["",""],
    setChosenType: ()=> {},
    score: [],
    setScore:()=>{}

})

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
 
    // const changingDisplay = (displayArray:string[]):string[] => {
    //     const temp = [...displayArray]
    //     temp.map((el)=> {
    //         if (pokemonType.includes(el)) {
    //             return el
    //         } else {
    //             return pokemonType.find((pokeType)=> pokeType !== el)
    //         }
    //     })
    // }
    

    async function getPokemon(id: number) {
        try {
            // console.log(id)
           const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          
           if (!response.ok) {
            throw new Error("unable to fetch pokemon-id is bad")
           } else {
            const pokemon = await response.json()
            
            
            pokemon.types.forEach((current:pokemonType) => {
                // console.log("this is the current type being uploaded", current.type.name)
                setPokemonType((prev)=> [...prev, current.type.name])
                
            });
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
    useEffect(()=> {
        // console.log("the new chosen type", chosenType)
        setDisplaytype(chosenType)
        console.log(score)

    },[chosenType,score])
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

    }
    
   
    
    return (
        <div>
            {image && (
                <img src={image} alt="" />

            )}
            
            
            <h2>{name}</h2>

           {displayType &&  (displayType.map ((item:string,index:number)=> (
            
            
                <p onClick={()=> handleRemovingType(item)} key={index}>type{index}: {item}</p>
           
            )))}
            <p>{pokemonType[0]}</p>
            {pokemonType[1] && (
                <p>{pokemonType[1]}</p>
            )}
            <button onClick={handleSubmitType}>Submit</button>
            {/* where all the types are displayed */} 
            <chosenTypeContext.Provider value={{chosenType, setChosenType, score, setScore}}>

       
           <TypeSection />
                </chosenTypeContext.Provider>
        </div>

        
    )

}
export default Game