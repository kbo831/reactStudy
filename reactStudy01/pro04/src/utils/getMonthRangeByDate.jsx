
export const getMonthRangeByDate= (date) =>{
//해당 년의 월에 대한 데이터만 필터하려면 해당월의 시작일과 해당일의 끝시간까지가 필요

const beginTimeStamp = new Date(date.getFullYear(),date.getMonth(),1).getTime();
// 해당월의 마지막 날의 시간까지 인자로 넘겨 데이트 객체를 받고 타임스탬프 값으로 변환
const endTimeStamp = new Date(date.getFullYear(), date.getMonth()+1,0,23,59,59).getTime();

return {beginTimeStamp,endTimeStamp};

}