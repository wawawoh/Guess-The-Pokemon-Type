import { useEffect, useState } from "react"
import TypeButton from "./TypeButton"

function TypeSection() {
    interface typeObject {
        name:string,
        icon:string
    }
    const [typeState, setTypeState] = useState<typeObject[]>([])
    
    useEffect(()=> {
        
        createTypeObject()

    },[])
   
    async function getType(id:number):Promise<typeObject> {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${id}/`)
            if (!response.ok) {
                throw new Error("there was a bad type")
            }
            else {
                const typeData = await response.json()
                // console.log(typeData)
                // console.log(typeData.sprites["generation-viii"]["brilliant-diamond-and-shining-pearl"])

                return {
                    name: typeData.name,
                    icon: (typeData.sprites["generation-viii"]["brilliant-diamond-and-shining-pearl"]["name_icon"])
                    


                  }
            }

        } catch (error){
            console.error(error)
            return {
                name:"unknown",
                icon:"dead icno"
            }

        }
        
    }
    async function createTypeObject  () {
        const promises = []
        for (let index = 1; index <=18; index++) {
            promises.push(getType(index))
            
            
        }
        const results = await Promise.all(promises)
        setTypeState(results)
    }
    const createBoardButtons = () => {
        return typeState.map((type)=> (
           
                    <TypeButton key={type.name} name={type.name} icon={type.icon} />

            
        
        ))
    }
    return (
        // this is the type board
        <section >
            {typeState && (
                createBoardButtons()

            ) }

        </section>
    )

    

}
export default TypeSection