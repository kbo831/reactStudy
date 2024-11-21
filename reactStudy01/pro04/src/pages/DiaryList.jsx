
import Button from '@pages/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';


//재생설할 필요 없으면 컴포넌트 밖에 선언
const sortOptionList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"오래된 순"},
];

const DiaryList = ({data}) =>{
    //console.log("diary data" , data);

    //사용자가 선택한 값을 저장하기 위해 State 생성하기 
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType=(e)=>{
        setSortType(e.target.value);
    }

    //일기 생성페이지로 이동하기위한 navigate생성
    const navigate = useNavigate();
    //버튼에 적용할 onCLick 이벤트 생성
    const conClickNew=()=> {
        navigate("/new");
    }

    //최신순을 기준으로 sorted 된 데이터 상태관리
    const [sortedData, setSortedData] = useState([]);
    useEffect(()=>{
        //sortType에 따른 정렬
        const compare=(a,b) => {
            if(sortType === "latest"){
                return Number(b.date) -  Number(a.date); // 양수 1 반환 , latest
            }else{
                return Number(a.date) -  Number(b.date); // 음수 -1반환 ,oldest
            }
        }

        /* 
        const copyList = data 로 선언하면 참조하는 주소값이 동일해서 원본 데이터에 영향을 줌
        원본 데이터를 보호하고 불변성을 유지하며, 데이터 무결성을 보장하기 위해 배열 복사해서 사용
        리액트와 같은 상태 기반 프레임워크에서 원본 데이터를 직접 수정하면 상태 관리가 깨질 수 있음 깊은 복사를 통해 원본 데이터를 보호

        JSON.stringify(data) : 배열 data를 문자열로 직렬화하여 원본 데이터의 구조를 단일 문자열로 만듦
        JSON.parse(JSON.stringify(data)) : 직렬화되어 단일구조문자열로 변환된 데이터를 다시 배열로 파싱해서 복사
        */
    
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);  // 복사한 배열 sortType에 따라 정렬 
        setSortedData(copyList); // 정렬된 데이터 sortedData로 반환

    },[data,sortType]); // 의존성 배열에는 변화가 감지되는 기준의 배열을 입력 

    return (
            <div className="DiaryList ">
                <div className="listWrap flex flex-between border-top">
                    <span className="left">
                        <select name="" id="" value={sortType} onChange={onChangeSortType}>
                            {sortOptionList.map((item,index)=>(
                                <option key={index} value={item.value}>{item.name}</option>
                                )
                            )}

                        </select>
                    </span>
                    <span className="right">
                        <Button type={"positive"} text={"새 일기 쓰기"} onClick={conClickNew}></Button>
                    </span>
                </div>
                {/* sortedData 된 데이터 아래 렌더링하기 */}
                <ul className="itemWrap emoul border-bottom custom-scrollbar">
                    {sortedData.map((item)=>(
                        <DiaryItem key={item.id} {...item}></DiaryItem>
                    )
                    )}
                </ul>

            </div>
    );
}

export default DiaryList;

