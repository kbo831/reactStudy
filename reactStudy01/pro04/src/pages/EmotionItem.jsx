import React from "react";

const EmotionItem=({id,name,emotionName,src,onClick,isSelected})=>{
    //onClick 했을 때 id 값을 state 변수에 넣어주기 setState 
    const handlerOnClick=()=>{
        onClick(id);
        console.log("onClick ID" , onClick(id) );
    }

    return(
        <li className={["flex-inline","flex-center","EmotionItem", isSelected ? `EmotionItem${id}_on`:`EmotionItem${id}_off`].join(" ")} onClick={handlerOnClick}>
            <span className="img">
                <img src={src} alt={name} />
            </span>
            <span>{emotionName}</span>
        </li>

    );
}

export default React.memo(EmotionItem)
