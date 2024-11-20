const Header=({leftChild,headerTitle,rightChild})=>{

    return(
        <header className="listWrap flex flex-center flex-between border-bottom">
            <div className="header left">{leftChild}</div>
            <div className="header title">{headerTitle}</div>
            <div className="header right">{rightChild}</div>
        </header>
    );
}

export default Header;