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
      {id:index,
      name:item.split("/").pop(), // 파일명 추출
      src:item, // 이미지 주소 저장
      emotionId:index+1
    })
);

export const emoArray = structuredArray.map(({id,name,src,emotionId})=>{
//  console.log("ID:", id, "Name:", name, "Source:", src);
  return {id, name:name.toUpperCase(),src,emotionId}
})



