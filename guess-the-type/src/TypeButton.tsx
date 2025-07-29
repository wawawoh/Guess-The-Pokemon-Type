import { useContext } from "react"
// import { chosenTypeContext } from "./Game"
import { chosenTypeContext } from "./chosenTypeContext"

 interface typeObject {
        name:string,
        icon:string
    }
function TypeButton ({name, icon}: typeObject) {
    const {chosenType, setChosenType,score} = useContext(chosenTypeContext)

    
    const determineTruth = ():string => {
        // console.log("determing the truth")
        if (!chosenType.includes(name)) {
            return "normal-button"
            
        }
        const index = chosenType.findIndex((element) => element === name)
        // console.log(index, "this is the index and this is score in", score[index])
             if (score[index] ===true)  
             return"correct-button"
             else {
                return "incorrect-button"
             }
       }
    

    const handleButtonClick = (name:string) => {
        if (chosenType.includes(name) 
            ||
         chosenType.every((current) => current !=="")) {
            console.log("cannot enter type")
            
         } else {
            console.log("can enter ", name)
            setChosenType((prev)=> addToChosenType(prev, name))
            return
         }
        
    }   
    const addToChosenType = ((array: string[],newType:string):string[]=> {
        const newArray = [...array]
        newArray.map((item:string,index:number)=> {
            if (item === "" && newArray[0]!== name) {
                newArray[index] = newType
                
            }

        })
        return newArray
    })


    return (
        <button 
        className={score.length === 0 ? "regular-button" : determineTruth()}
         onClick={()=> handleButtonClick(name)}><img src={icon} alt={name} /></button>
    )
    

}
export default TypeButton