// img 폴더 내 모든 이미지 파일을 동적으로 가져오기 (Webpack에서만 동작)
const emotionImg = import.meta.glob('/src/images/*.{png,jpg,webp,svg,gif}');

// 이미지를 담을 배열 선언 
const imgArray = [];

for (let img in emotionImg) { // emotionImg 집합을 순회하면서 img로 하나씩 imgArray에 담아 줌!
  imgArray.push(img);
}
//console.log("for-in",imgArray);

const structuredArray = 
  imgArray.map(
      (item, index)=>(
      {id:index+1,
      name:item.split("/").pop(), // 파일명 추출
      src:item, // 이미지 주소 저장
      emotionId:index+1
    })
);

export const emoArray = structuredArray.map(({id,name,src,emotionId})=>{
//  console.log("ID:", id, "Name:", name, "Source:", src);

// 감정이름 변수 초기화, 값 설정할 변수 
let emotionName = "";

// emotionId에 따른 감정이름 반환  switch문
switch(emotionId%5){
  case 1: 
    emotionName="아주 행복";
    break;
  case 2: 
    emotionName="행복";
    break;
  case 3: 
    emotionName="보통";
    break;
  case 4: 
    emotionName="나쁨";
    break;
  case 0: 
    emotionName="아주 나쁨";
    break;
  default:
    emotionName = "보통"; 
    
}


  return {id, name:name.toUpperCase(),src,emotionId,emotionName}
})



