
import Header from '@components/Header';
import Button from '@pages/button';
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from './../App';
import { getMonthRangeByDate } from '../utils/getMonthRangeByDate';
import DiaryList from './DiaryList';


const Home = () =>{

    //App에 생성된 DiaryStateContext의 value에 담긴 data를 사용하기위해 useContext()를 선언하고 인자로 생성된 context를 넘겨줌
    const data = useContext(DiaryStateContext); 
    console.log("Data",data);
    //이전 월 로 넘어갈 수 있는 데이터 초기 변수 생성
    const [pivotDate, setPivotData] = useState(new Date());
    //해당월에 따른 다이어리 내용 변경 초기 값
    const [filteredData, setFilteredData] = useState([]); 
    //

    //해당월에 속하는 데이터들 마운트 시 또는 데이터에 변화가 생길 때에만 렌더링 
    useEffect(()=>{
        console.log("data",data);
        console.log("pivotDate",pivotDate);
        if(data.length>0){
            // 해당월에 속하는 데이터를 필터링 = 1) 현재날짜를 기준으로한 시작,끝 값 구조분해 할당ㅇ하기 
            const {beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                // 전체 data를 기준으로 filter
                data.filter((item)=> beginTimeStamp <= item.date && item.date <= endTimeStamp)
            );
        }else{
            //데이터 없으면 빈 배열
            setFilteredData([]);
        }

    },[data,pivotDate]);



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
            <div>
            <DiaryList data={filteredData}></DiaryList>
            </div>
            
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

