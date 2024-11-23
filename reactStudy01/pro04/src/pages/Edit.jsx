import  Button  from '@pages/button';
import  Editor  from '@pages/Editor';
import { replace, useNavigate, useParams } from 'react-router-dom';
import { emoArray } from '../utils/emoArray';
import useDiary from './../hooks/useDiary';
import  Header  from '@components/Header';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';



if (!emoArray || emoArray.length === 0) {
    console.error("emoArray is empty or undefined.");
    // 기본 데이터 제공 또는 오류 처리 ==> emoArray 보다 선 기입해야함.
  }
const Edit = () =>{
    //url 파라미터 사용
    const {id} = useParams();
    const data = useDiary(id);  // id에 해당하는 다이어리 특정 데이터 반환
   
    const navigate = useNavigate(-1);
    const goBack= () =>{
        navigate(-1);
    }

    //상태변화 데이터를 전달해주는  context 선언하기
    const {onDelete,onUpdate} = useContext(DiaryDispatchContext);
    const onClickDelete=(e)=>{
        e.stopPropagation();
        // 사용자에게 인수로 전달한 텍스트와 함꼐 경고 대화상자 출력하는 브라우저 메서드, 사용자가 확인하면  true 를 반환함
        if(window.confirm("일기를 삭제할까요? 복구 불가!")){ 
            console.log("id",id)
            onDelete(id); // 해당 데이터 삭제
            navigate("/",{replace:true});
        }
    }

    const onSubmit = (data) =>{
        console.log("data",data)
        if(window.confirm("일기를 수정할까요? 복구 불가!")){ 
          //  targetId,date,emotionId,content
            console.log("id",id)
            const {date, emotionId,content} = data;
            onUpdate(id,date, emotionId,content);
            navigate("/",{replace:true});
        }
    }

    
    if(!data){
        return <div>데이터 불러오는 중</div>
    }else{
        return(
            <>
            <Header leftChild={<Button text={"이전"} onClick={goBack}/>} headerTitle={"일기수정"}  rightChild={<Button type={"negative"} text={"삭제"} onClick={onClickDelete}/>} />
            <Editor initData={data}  onSubmit={onSubmit}/>
            </>

        );
    }   
}

export default Edit;    