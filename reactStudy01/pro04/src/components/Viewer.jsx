import { emoArray } from "../utils/emoArray";


const Viewer = ({content,emotionId})=>{ 
// (content,emotionId) props를 넘겨주면 하나의 객체로 묶여 버림, 구조분해할당을 위해 `({ content,emotionId })`로 사용하기    
    console.log("emoArray",emoArray); 
    console.log("emotionId",emotionId); 
    console.log("content",content); 
    //특정 이모션 아이템 가져오기 (배열이나 리스트 대상으로 find ()함수를 통해 하나의 데이터를 찾음)
    const emoItem = emoArray.find((item)=> String(item.id) === String(emotionId));
    // const {emoSrc, emoName} = emoItem;
    console.log("emoItem",emoItem); 
    return(
        <>
            <div>
                <h4>오늘의 일기</h4>
                <div className="img">
                    <img src={emoItem.src} alt={emoItem.emotionName}/>
                </div>
                <div>
                    {content}
                </div>

            </div>
        </>
    );
}

export default Viewer;