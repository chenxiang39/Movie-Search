import React, { Component } from 'react'
import style from './CoverCast.module.css'
export class CoverCast extends Component {
    constructor(props){
        super(props);
    }
    renderItem = () =>{
        return this.props.castArr.map((cur,index)=>{
            const url = cur.profile_path != null ? "https://image.tmdb.org/t/p/w185" + cur.profile_path : "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png";
            const imgCss = {
                height:278 + 'px',
                width:185 + 'px',
                background:'url(' + url +')'
            }
            const name = cur.name;
            const charater = cur.character
            return (
                <div key = {index} className = {style.introContainer}>
                    <div style = {imgCss}></div>
                    <div className = {style.introName}>
                        {name}
                    </div>
                    <div className = {style.introCname}>
                        AS
                        <br></br>
                        {charater}
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className = {style.container}>
                <div className = {style.title}>
                    Cast
                </div>
                {this.renderItem()}
            </div>
        )
    }
}

export default CoverCast
