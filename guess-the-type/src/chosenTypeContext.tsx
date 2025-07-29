import { createContext } from "react";
interface chosenTypeContextValue {
    chosenType: string[];
    setChosenType:React.Dispatch<React.SetStateAction<string[]>>,
    score:boolean[]
    

}
export const chosenTypeContext = createContext<chosenTypeContextValue> ({
    chosenType: ["",""],
    setChosenType: ()=> {},
    score: [],
    

})