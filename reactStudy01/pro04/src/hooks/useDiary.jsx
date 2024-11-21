
//hook을 명시하기 위해서는 use를 접두어로 사용해야하며, 커스텀 훅은 자바스크립트 함수로 만듦

import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";

//아이디에 따른  특정일기를 가져오는 리액트 훅
const useDiary = (id) =>{
    // useContext 리액트 훅을 사용해서 DiaryStateContext의 데이터를 가져오려면 useContext에 DiaryStateContext를 전달하여 반환되면 data변수에 저장
    const data = useContext(DiaryStateContext); // 전체 데이터를 가져옴
        
    //변화기 일어나는 요소 : id, data ==> 데이터 목록 중 id가 일치하는 데이터를 찾아서 상태변화 함수를 실행해 상태값을 갱신해야 함
    const [diary,setDiary] = useState();
    //페이지 네비게이션 
    const navigate= useNavigate();


    //마운트 또는 변경이 감지되었을 때에만 렌더링 --> useEffect()
    useEffect(()=>{
        //data 중에서 인자로 들어온 id와 일치하는 데이터를 반환하여  diary 초기값으로 설정해줘야 함.
        const matchDiary = data.find((item)=>( String(item.id) === String(id)));
        if(matchDiary){ // matchDiary true이면 (있으면)
            setDiary(matchDiary); // diary 데이터 값 갱신
        }else{
            alert("해당 데이터가 없습니다.");
            navigate("/",{replace:true});//홈으로 이동, 두 번째 인자로 {replace:true}를 전달하면 뒤로 가기 비활성화
        }

    },[id,data]);


    return diary;
}

export default useDiary;