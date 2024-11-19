
import Header from '@components/Header';
import Button from '@pages/button';
import { useState } from "react";



const Home = () =>{

    //이전 월 로 넘어갈 수 있는 데이터 초기 변수 생성
    const [pivotDate, setPivotData] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()} - ${pivotDate.getMonth()+1}`;
    const onIncreaseMonth=()=>{
        setPivotData(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
    }

    const onDecreaseMonth=()=>{
        setPivotData(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
    }

    return(
        <>
            <Header leftChild={<Button type={"default"} text={"이전"} onClick={onDecreaseMonth}/>} headerTitle={headerTitle} rightChild={<Button text={"다음"} onClick={onIncreaseMonth}/>}/>
        </>
    );
}

export default Home;

{/* <Button type={"create"} text={"생성"} onClick={()=>{console.log("생성")}} />
<Button type={"update"} text={"수정"} onClick={()=>{console.log("수정")}} />
<Button type={"delete"} text={"삭제"} onClick={()=>{console.log("삭제")}} />
<Button type={"complete"} text={"완료"} onClick={()=>{console.log("완료")}} />
<Button type={"list"} text={"목록"} onClick={()=>{console.log("목록")}} />
<Button type={"back"} text={"이전"} onClick={()=>{console.log("이전")}} /> 
<Button type={"cancel"} text={"취소"} onClick={()=>{console.log("취소")}} />
*/}

