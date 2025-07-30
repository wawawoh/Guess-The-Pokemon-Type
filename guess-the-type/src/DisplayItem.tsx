interface props {
    item:string,
    handleRemovingType: (item:string) => void,
    score:boolean[],
    index:number
    
}

function DisplayItem ({item, handleRemovingType, score,index}:props)  {
     const determineScoreTruth = (index:number) => {
        if (score[index] ) 
            {return "correct-display"

            } else {
                return "incorrect-display"
            }
    } 
    if (item === "") {
        item = "______"
    }
    return (
        <button className={score.length ===0 ? "normal-display" : determineScoreTruth(index)}  onClick={()=> handleRemovingType(item)}>{item}</button>
    )

}
export default DisplayItem