import { useNavigate } from "react-router-dom";
import  Header  from '@components/Header';
import Button from '@pages/button';
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from '@pages/Editor';


const New = () =>{
    const {onCreate} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const goBack=()=>{
        navigate(-1);
    }

    const onSubmit = (data) =>{
        console.log("data",data)
        const {date, emotionId,content} = data;
        onCreate(date, emotionId,content);
        navigate("/",{replace:true});

    }

    return(
        <>
        <Header leftChild={<Button text={"이전"} 
                onClick={goBack}/>}
                headerTitle={"새 일기"}/>
        <Editor onSubmit={onSubmit}/>
    </>
    );
}

export default New;