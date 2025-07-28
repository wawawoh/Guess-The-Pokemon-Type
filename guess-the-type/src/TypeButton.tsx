 interface typeObject {
        name:string,
        icon:string
    }
function TypeButton ({name, icon}: typeObject) {
    return (
        <button><img src={icon} alt={name} /></button>
    )
    

}
export default TypeButton