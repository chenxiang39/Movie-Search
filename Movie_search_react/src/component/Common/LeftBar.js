import React from 'react';
import store from '../../redux/store'
import style from './LeftBar.module.css';
import {clickHome,clickSearch} from '../../redux/actions/LeftBar'
class LeftBar extends React.Component{
    constructor(props){
        super(props);
        this.btnlist = this.btnlist.bind(this);
    }
    btnFun = (e) =>{
        //use curtext!!!because div dont't have "value"(button have)
        //需要自定义属性，如果直接使用value,则点击到按钮内部的div时会获取不到value,因为div没有默认属性(value)，而button有！
        if(e.target.getAttribute("curtext") === 'Home'){
            store.dispatch(clickHome(''));
        }
        else if(e.target.getAttribute("curtext") === 'Search'){
            store.dispatch(clickSearch(''));
            // store.dispatch(clickSearchAsync('',1000));
        }
    }
    btnlist(){
        let chosed = store.getState().leftbar;
        return this.props.leftBarArr.map((btnName,index) =>{
            let btnCss = style.btn + ((chosed === btnName)? (' ' + style.btn_clicked):'')
            let txtCss = style.txt + ((chosed === btnName)? (' ' + style.txt_clicked):'');
            let arrowCss = style.arrow + ((chosed === btnName)? (' ' + style.arrow_clicked):'');
            return (
                <button key = {index} curtext = {btnName}  className={btnCss} onClick={this.btnFun}>
                    <div curtext = {btnName} className={txtCss}>
                        {btnName}
                    </div>
                    <div curtext = {btnName} className={arrowCss}>
                        ⟶
                    </div>
                </button>
            )
        })        
    }
    render(){
        return (  
            <div className = {style.bar}>
                {this.btnlist()}
            </div>
        )
    }
}
export default LeftBar;