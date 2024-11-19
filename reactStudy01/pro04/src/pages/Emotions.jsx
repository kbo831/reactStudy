
const Emotions=({emotions, onSelectEmotion})=>{
    
    return (
    <ul className="flex">
        {emotions.map(({id,name,src})=>(
            <li key={id} id={id} >
                <img src={src} alt={name} onClick={() => onSelectEmotion(id)}/>
                <span>{name}</span>
            </li>
        )) 
        }
    </ul>

    )
}

export default Emotions