import { useSearchParams } from "react-router-dom";
import Header from '@components/Header';
import Button from '@pages/button';
import Edit  from '@pages/Edit';



const Home = () =>{

//쿼리스트링 파라미터 받아오는 법 : useSearchParams() 리액트 훅 사용해서 첫 번째 요소(조회,수정이 가능한 메서드를 포함한 쿼리스트링 객체,)와 두 번째 요소( 쿼리스트링 객체를 갱신하는 함수)를 반환 받음

//useSearchParams 가  반환한 첫 번째 요소에서 sort값을 불러와 콘솔에 출력하기위해 get 메서드를 이용
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("searchParams",searchParams.get("sort")); // 쿼리스트링의 key(sort)의 value를 출력함

    return(
        <>
            <Header leftChild={<Button type={"positive"} text={"긍정"} onClick={()=>{console.log("긍정")}} />} headerTitle={"일기장 Home"} rightChild={<Button type={"negative"} text={"부정"} onClick={()=>{console.log("부정")}} />}  />
            <Edit initData={{
                    date:new Date().getTime(),
                    emotionId:1,
                    content:"이전에 작성했던 일기"
            }}
            onSubmit={()=>console.log("작성완료")}
            />
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

