import { useEffect, useState } from "react"

import TypeSection from "./TypeSection"

function Game() {
    const [image,setImage] = useState("")
    const [name, setName] = useState("")
    const [pokemonType, setPokemonType] = useState<string[]>([])
    const [chosenType, setChosenType] = useState (["steel", ""])
    interface insideType {
        name: string,
        url:string
    }
    interface pokemonType {
                slot: number,
                type: insideType


            }


 
    

    async function getPokemon(id: number) {
        try {
            // console.log(id)
           const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          
           if (!response.ok) {
            throw new Error("unable to fetch pokemon-id is bad")
           } else {
            const pokemon = await response.json()
            
            
            pokemon.types.forEach((current:pokemonType) => {
                console.log(current.type.name)
                setPokemonType((prev)=> [...prev, current.type.name])
                
            });
            setImage(pokemon.sprites.front_default)
            setName(pokemon.name)
           
           
           }

        } catch (error) {
            console.error(error)
        }
        
    }
    useEffect(()=> {
        getPokemon(1008)

    },[])
    useEffect(()=> {
         if (chosenType.every(type => pokemonType.includes(type))) {
            console.log("the types are all true")
         }else {
            console.log("false")
         }

    },[pokemonType])
   
    
    return (
        <div>
            {image && (
                <img src={image} alt="" />

            )}
            
            <h2>{name}</h2>
            <p>{pokemonType[0]}</p>
            {pokemonType[1] && (
                <p>{pokemonType[1]}</p>
            )}
            {/* where all the types are displayed */} 
           <TypeSection />
        </div>

        
    )

}
export default Game