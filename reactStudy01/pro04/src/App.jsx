
import './App.css'
import './common.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Mokdata } from './modata';

/*
코드 실행순서 
const [isDataLoaded, setIsDataLoaded] = useState(false);
 const [data,dispatch] = useReducer(reducer,[]);
const idRef = useRef(0); 
-------------- 초기화-----------------------------------------

useEffect(()=>{
dispatch({
  type:"INIT",
  data:Mokdata,
});
setIsDataLoaded(true);
},[])
----- useEffect가 Mount 시에 한번 실행, 이후 dispatch 함수 실행하고 function reducer(state,action) 를 통해 
INIT 데이터를 modata로 갱신 , 그후 setIsDataLoaded()의 false 값을 setIsDataLoaded(true); 로 설정하여ㅏ
자식 컴포넌트가 페이지에 마운트 됨
*/


 // 모든 페이지에 사용할 데이터는 최상위컴포넌트 App에 만들어야 함

//컴포넌트의 라이프 사이클 관련 없는 함수나 값은 컴포넌트 밖에 생성해야 리렌더가 발생하지 않음.
// 컴포넌트 내부에 선언 시 리렌더링 방지하려면 useCallback(), useEffect() 를 사용해야함


 //useReducer에 사용할 상태 변화 함수 설정
function reducer(state,action){

  switch(action.type){
    case "CREATE" :{
      return [action.data, ...state]; // 1) 새로운 data객체 맨 앞에 추가, 2)...state는 기존에 있던 목록들 데이터
    }
    case "UPDATE" : {
      return state.map((item)=> String(item.id) === String(action.data.id)? {...action.data}: item )
      // item.id와 action.data.id의 타입이 다를 수 있기 때문에 String()으로 변화해서 비교해 줌
    }
    case "DELETE" : {
      return state.filter((item) => String(item.id) !== String(action.targetId));
      //id가 일치하지 않은 데이터목록만 반환
    }
    case "INIT" : {
      return action.data;
      //반환되는 값은 dispatch에 담겨있는 액션객체의 요소들을 반환하면됨
    }
    default : {
      return state;
    }
  }

}

//context 
export const DiaryContext = React.createContext();// state 값을 공급하는 context
export const DiaryDispatchContext = React.createContext();// 생성, 수정(갱신), 삭제 값을 공급하는 context


function App() {
//init 데이터가 변경이 감지되면 초기값변경
const [isDataLoaded, setIsDataLoaded] = useState(false); 

const [data,dispatch] = useReducer(reducer,[]);
// 배열 형태의 일기를 리스트로 렌더링 하려면 아이템별로 고유key 를 부여해아하기 때문에 const idRef = useRef() 생성
const idRef = useRef(0); // 초기값은 0


useEffect(()=>{
  // useEffect() 리액트 훅을 사용해서 dispatch함수를 호출하고 액션 객체를 만들어 useReducer()에 전달해줘야 상태 관리가 가능
  //의존성 배열이 빈 배열이면 마운트 시에만 변화를 감지하여 렌더링 됨
dispatch({
  type:"INIT",
  data:Mokdata,
});
setIsDataLoaded(true);
},[])


//상태 변화 함수이며, dispatch를 호출하는 함수,액션 객체를 생성
const onCreate = (date,emotionId,content) =>{
// 필요 데이터 : 날짜, 감정이모티콘, 일기내용 => date, emotion(Id), content
dispatch({
  type:"CREATE", // 이벤트 발생 시 작동해야할 dispatch 타입 결정
  data:{
    id:idRef.current, // 참조한 객체의 현재값 ==> index의 역할을 함
    date: new Date(date).getTime(), // 인자로 넘어온 date를 기반으로 새로운 날짜 객체 생성후 타임스탬프형태로 변환,
    content,
    emotionId
  }
});
idRef.current +=1; // dispatch 이후에 idRef.current 증가 ( 일기 인덱스 중복 방지)
}

const OnUpdate= (targetId,date,emotionId,content) =>{
  //targetId 는 수정할 데이터를 타겟팅할 때 필요
  dispatch({
      type:"UPDATE",
      data:{
        id:targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
  });
//end
}

const OnDelete= (targetId) =>{
  //targetId 는 삭제할 데이터를 타겟팅할 때 필요
  dispatch({
      type:"DELETE",
      targetId,
  });
//end
}

 if(!isDataLoaded){ //isDataLoaded 가 true 가 아니면 = false
  return <div>데이터를 불러오는중 </div>
 }else{ // data 가 들어오면
  return (
    <DiaryContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,OnUpdate,OnDelete}}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/diary/:id" element={<Diary/>}/>
          <Route path="/edit/:id" element={ <Edit/>}/>
        </Routes>

        <div className="navi">
          <Link to="/">Home</Link>
          <Link to="/new">New</Link>
          <Link to="/diary">Diary</Link>
          <Link to="/edit">Edit</Link>
        </div>
      </div>
      </DiaryDispatchContext.Provider>
    </DiaryContext.Provider>
  )
  }
}

export default App


