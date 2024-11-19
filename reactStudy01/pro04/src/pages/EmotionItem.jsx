const EmotionItem=({id,name,src,onClick,isSelected})=>{
    //onClick 했을 때 id 값을 state 변수에 넣어주기 setState 
    const handlerOnClick=()=>{
        onClick(id);
        console.log("onClick ID" , onClick(id) );
    }

    return(
        <li className={["EmotionItem", isSelected ? `EmotionItem${id}_on`:`EmotionItem${id}_off`].join(" ")} onClick={handlerOnClick}>
            <img src={src} alt={name} />
            <span>{name}</span>
        </li>

    );
}

export default EmotionItem;