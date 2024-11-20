import { useNavigate } from "react-router-dom";
import { emoArray } from "../utils/emoArray";
import { getFormattedDate } from "./getFormattedDate";



const DiaryItem = ({id, emotionId, content,date}) =>{
    //상세페이지로 이동 navigate 선언
    const navigate = useNavigate();
    const goDetail =() =>{
        navigate(`/diary/${id}`);
    };

    //date는 타임스탬프형식이기 때문에 Date 객체로 변환하기 위해 new Date 객체에 인자로 전달 후 utils 로 인자로 넘겨 반환
    const fulldate = getFormattedDate(new Date(date));
    //console.log("fulldate",fulldate);
    return(
        <li key={id} className="diaryItem flex flex-start" id={emotionId} onClick={goDetail}>
        <span className={["img", `img${emotionId}`].join(" ")}>
            {/* emoarray 배열에서 li의 emotionId와 같은 객체 하나만 가져오려면 find() 함수를 사용하면 됨! */}
            {//익명함수를 사용하는 이유는 익명함수는 즉시 실행되기때문에 jsx내부에서 로직을 직접 처리하고 결과를 바로 반환할 수 있기 때문에 
                (() => {
                    //특정 조건에 맞는 하나를 찾을 때는 find() 함수를 사용
                    const matchedItem = emoArray.find((item) => item.emotionId === emotionId);
                    // 반환할 객체에 대한 조건을 삼항조건문을 통해 반환
                    return matchedItem ? (
                    <img className={matchedItem.id} src={matchedItem.src} alt={matchedItem.name} />
                    ) :  <img className="nodata" src="" alt="이미지없음" />;
                })()
            }

        </span>
        <span className="textContent multi-line-ellipsis">{content}</span>
        <span className="date">{fulldate}</span>
        </li>

    );
}

export default DiaryItem;   