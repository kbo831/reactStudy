import { useParams } from "react-router-dom";
import useDiary from './../hooks/useDiary';

const Diary = () =>{

    //react-router-dom 라이브러리가 제공하는 리액트 훅 useParams 이용
   // const params = useParams(); // 파라미터 값을 가져올 수 있는 리액트 훅
    const {id} = useParams(); //구조분해 할당으로 id값 가져오기
    const data = useDiary(id); // Url  파라미터로 받은 id 값을 인자로 전달
   // console.log("diary2" ,data)

    //데이터가 없을때 undifined값에 대해 예외 처리(undefined 값을 객체로 오인해 프로퍼티에 접근하려는 동작을 막아 프로젝트의 안정성에 도움을 줌)
    if(!data){
            return <div>데이터를 불러오는 중입니다.</div>
    }else{
  
        return(
            <div>
                <span>{id}번</span>
                <span></span>
            </div>
        );
    }

}
export default Diary;