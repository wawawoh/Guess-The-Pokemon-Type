import  {  useEffect, useState } from "react"
import { chosenTypeContext } from "./chosenTypeContext"

import TypeSection from "./TypeSection"
import DisplayItem from "./DisplayItem"


function Game() {
    const [image,setImage] = useState("")
    const [name, setName] = useState("")
    const [pokemonType, setPokemonType] = useState<string[]>([])
    const [chosenType, setChosenType] = useState <string[]>([])
    const [displayType, setDisplaytype] = useState<string[]>([""])
    const [score, setScore] = useState<boolean[]>([])
    const [reset, setReset] = useState(false)
    
    
     
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
        setPokemonType([])
        setScore([])
        setDisplaytype([])
        setChosenType([])
        getPokemon(Math.floor((Math.random()* 1024) +1))
        

    },[reset])
    //   const determineScoreTruth = (index:number) => {
    //     if (score[index] ) 
    //         {return "correct-display"

    //         } else {
    //             return "incorrect-display"
    //         }
    // } 

    
    
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
   
    const determineChat = (item:string,index:number) =>  {
        
        if ( pokemonType.length ==2) {
            if (index === 0 ) {
                  return <span>The {<DisplayItem item={item}  handleRemovingType={handleRemovingType} score = {score} index={index}/>}  </span>

            }
            if (index === 1 ) {
                return <span>and {<DisplayItem item={item}  handleRemovingType={handleRemovingType} score = {score} index={index}/> }  type</span>
            }
        } else {
            return <span>the {<DisplayItem item={item}  handleRemovingType={handleRemovingType} score = {score} index={index}/>}  type </span>
        }
        
        
    }

   
    
    return (
        <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center px-10 py-3 text-2xl gap-4 max-lg:text-[1.5rem]">
            {image && (
                <img className="w-50" src={image} alt="" />

            )}
            
            
            <h2 className="capitalize">{name}</h2>
            <div className="flex self-stretch justify-center gap-1 ">
           {displayType &&  (displayType.map ((item:string,index:number)=> (
            
                
<p className="flex flex-wrap max-lg:text-[1.1rem]"
                
                 key={index}>{determineChat(item,index)}</p>
                
                
           
            )))}
            </div>
            <div className="flex gap-10 text-[1.2rem]">
<button className="px-3 rounded-3xl bg-gray-900" onClick={()=> setReset((prev)=>!prev )}>New</button>
            <button className="px-3 rounded-3xl bg-gray-900" onClick={handleSubmitType}>Submit</button>
            </div>
            
            {/* where all the types are displayed */} 
            <chosenTypeContext.Provider value={{chosenType, setChosenType, score}}>

       
           <TypeSection />
                </chosenTypeContext.Provider>
        </div>

        
    )

}
export default Game