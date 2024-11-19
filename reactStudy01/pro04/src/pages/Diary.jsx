import { useParams } from "react-router-dom";

const Diary = () =>{

    //react-router-dom 라이브러리가 제공하는 리액트 훅 useParams 이용
   // const params = useParams(); // 파라미터 값을 가져올 수 있는 리액트 훅
    const {id} = useParams(); // 구조분해 할당으로 id값 가져오기
    console.log( {id});

    
    return(
        <div>
        {id}번 Diary
        </div>
    );
}

export default Diary;