import React from 'react';
import style from './Header.module.css'
function Header(){
    return (
        <div className={style.container}>
            <div className={style.title}>THE MOVIE DB</div>
            <div className={style.colorbar}></div>
        </div>
    )
}
export default Header;