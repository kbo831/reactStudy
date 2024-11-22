import { useNavigate, useParams } from "react-router-dom";
import useDiary from './../hooks/useDiary';
import { getFormattedDate } from "./getFormattedDate";
import  Header  from '@components/Header';
import Viewer from './../components/Viewer';
import Button from '@pages/button';

const Diary = () =>{

    //react-router-dom 라이브러리가 제공하는 리액트 훅 useParams 이용
   // const params = useParams(); // 파라미터 값을 가져올 수 있는 리액트 훅
    const {id} = useParams(); //구조분해 할당으로 id값 가져오기
    const data = useDiary(id); // Url  파라미터로 받은 id 값을 인자로 전달
   // console.log("diary2" ,data)

    const navigate = useNavigate();
    const goBack=()=>{
        navigate(-1);
    }
    const goEdit=()=>{
        navigate(`/edit/${id}`);
    }

    //데이터가 없을때 undifined값에 대해 예외 처리(undefined 값을 객체로 오인해 프로퍼티에 접근하려는 동작을 막아 프로젝트의 안정성에 도움을 줌)
    if(!data){
            return <div>데이터를 불러오는 중입니다.</div>
    }else{
        //데이터가 undefined 일때 구조분해 할당을 하면 에러가 발생하기 때문에  데이터가 없을 때 예외처리 해주기!
        const {date,emotionId,content} = data;
        const diaryDate = getFormattedDate(new Date(Number(date))); 
        // 타임 스탬프 객체 데이트 객체로 반환 후 형식변환 (문자열 일 수도 있으니까 Number로 숫자 변환)
        const title= `${diaryDate} 일기`;

        return(
            <>
                <Header leftChild={<Button text={"이전"} onClick={goBack}/>}
                        headerTitle={title} 
                        rightChild={<Button className={`btn`} type={"update"} text={"수정"} onClick={goEdit} />}
                />
                <div>
                    <Viewer content={content} emotionId={emotionId} />
                </div>

            </>
        );
    }

}
export default Diary;