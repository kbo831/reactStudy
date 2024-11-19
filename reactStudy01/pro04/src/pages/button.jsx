//버튼명(text), 버튼종류(type), 버튼이벤트(onclick) -> 부모로부터 받아와야하는  Props

const Button = ({text,type,onClick})=>{
    //버튼타입 설정 : 수정,삭제,생성,완료,목록,뒤로가기?
    const btnType=["create","delete","update","compelete","back","list","cancel","positive","negative"].includes(type)? type : "default";

    return(
        <button className={`btn`} id={`${btnType}Btn`} onClick={onClick} type={btnType}>{text}</button>
    );
}


export default Button;