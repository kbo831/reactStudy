// img 폴더 내 모든 이미지 파일을 동적으로 가져오기 (Webpack에서만 동작)
const emotionImg = import.meta.glob('/src/images/*.{png,jpg,webp,svg,gif}');
console.log(emotionImg);

// 이미지를 담을 배열 선언 
const imgArray = [];

for (let img in emotionImg) { // emotionImg 집합을 순회하면서 img로 하나씩 imgArray에 담아 줌!
  imgArray.push(img);
}
console.log("for-in",imgArray);

const Emotions = () =>{
  return(
      <>
        <ul className="flex">
          {imgArray.map((item,index)=>(
              <li key={index}>
                <img src={item} id={`emo${index}`}/>
            
              </li>
          ))}
        </ul>
      </>
  );
}


export default Emotions;
