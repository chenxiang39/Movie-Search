import React from 'react';
import LeftBar from './Common/LeftBar'
import style from './Content.module.css';
import RightContent from './Common/RightContent';
class Content extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            LeftBarArr:['Home','Search'],
        }
    }
    render(){
        return (
            <div className = {style.container}>
                <LeftBar leftBarArr = {this.state.LeftBarArr}/>
                <RightContent></RightContent>
                
            </div> 
        )
    }
}

export default Content;