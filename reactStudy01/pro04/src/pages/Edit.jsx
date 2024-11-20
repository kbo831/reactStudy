import  Button  from '@pages/button';
import { useEffect, useState } from 'react';
import { getFormattedDate } from './getFormattedDate';
import { useNavigate } from 'react-router-dom';
import { emoArray } from '../utils/emoArray';

import EmotionItem from './EmotionItem';



if (!emoArray || emoArray.length === 0) {
    console.error("emoArray is empty or undefined.");
    // 기본 데이터 제공 또는 오류 처리 ==> emoArray 보다 선 기입해야함.
  }
const Edit = ({initData,onSubmit}) =>{
    
//날짜 입력 폼 저장할 State
const [state,setState] = useState({
    date:getFormattedDate(new Date()),
    emotionId: emoArray.length > 0 ? emoArray[0].id : "", // 기본 감정 ID 또는 빈 값,
    content:"",
})
// useNavigate를 호출하면 클라이언트 ㅅ ㅏ이드 렌더링 방식으로 페이지를 이동하는 함수를 반환하고, 이 리액트 훅을 호출해 함수 navigate를 생성하면 페이지간 이동을 간편하게 구현할 수 있음

useEffect(()=>{
    if(initData){ // 초기 데이터가 있으면 state 에 초기값으로 반화해주기 위해서 필요 
        setState({
            ...initData,
            date:getFormattedDate(new Date(parseInt(initData.date)))
        })
    }
},[initData]);
// date:getFormattedDate(new Date(parseInt(initData.date)))
/* 1) initData.date는 데이터베이스나 APi로 가져왔을 경우 타임스탬프(유닉스 시간) 형식일 가능성이 있음 
2) 또한 initData.date가 문자열일 수 있기 때문에 숫자로 변환해주기 위해 parseInt()를 사용하여 숫자로 변환
3) 변환된 타임스탬프 값을 인자로 받아 계산된 날짜 객체를 생성하기 위해 new Date()를 생성한 후에 
4) getFormattedData() utils에 인자로 주어 반환되는 형식의 날짜 데이터를 얻을 수 있음*/


const navigate = useNavigate();

const handlerChangeDate = (e) =>{
    setState({
        ...state,
        date: e.target.value,
    })
}

const handlerChangeContent = (e) =>{
    setState({
        ...state,
        content: e.target.value,
    })
}

const handleSubmit=()=>{
    onSubmit(state);
}

const handlerChangeEmotion = (emotionId) =>{
    setState({
        ...state,
        emotionId
    })
    console.log("emotion onClick", emotionId);
}

const handleOnGoBack= ()=>{
    navigate(-1);// 인수로 -1을 넣어주면 뒤로 한페이지 이동함
}

    return(
        <>
       
        <div className="editor">
            <div className="editor_section">
                <h3>오늘 날짜</h3>
                <input type="date" value={state.date} onChange={handlerChangeDate}/>
            </div>
            <div className="editor_section">
                <h3>오늘의 감정</h3>
                <ul className="flex">
                    {emoArray.map((item)=>(
                        <EmotionItem key={item.id} {...item} isSelected={state.emotionId === item.id} onClick={handlerChangeEmotion}/>
                    ))  
                    }
                </ul>
                {/* isSelected 는 감정이미지에 있는 감정인지 검증하는 역할 */}
            </div>
            <div className="editor_section">
                <h3>오늘의 일기</h3>
                <textarea name="" id="" value={state.content} onChange={handlerChangeContent}></textarea>
            </div>
            <div className="editor_section">
                <Button type={"positive"} text={"완료"} onClick={handleSubmit} />
                <Button type={"cancel"} text={"취소"} onClick={handleOnGoBack} />
            </div>

            </div>


        </>
       
    );
}

export default Edit;    