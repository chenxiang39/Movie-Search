import React from 'react';
import style from './BottomBar.module.css'

function BottomBar(){
    return(
        <div className={style.container}>
            <span className = {style.text}>
                Designed and developed by Akansha. Pranav & Yash
                <br/>
                Powered by TMDB
            </span>
        </div>
    )
}
export default BottomBar;
