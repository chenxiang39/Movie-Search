import React from 'react';
import style from './SearchBar.module.css'
import ipAddress from '../../IpAddress.json'
import store from '../../redux/store';
import { clickClear,clickSearchDataAsync } from '../../redux/actions/SearchContainer';
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:"",
            select:["","Movies","TV Shows","Movies and TV Shows"],
            selected: "",
        }
    }
    rendertextarea(){
        return (
            <textarea className = {style.form} value = {this.state.text} onChange = {this.getContent("text")}></textarea>
        )
    }
    renderselect(){
        return (
            <select className = {style.form + " " + style.form_select} 
            value = {this.state.selected} onChange ={this.getContent("selected")}>
                {
                    this.state.select.map((value,index) =>{
                        return (
                            <option key={index} value={value}>{value}</option>
                        )
                    })
                }
            </select>
        )
    }
    getContent = (type) =>{
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        }
    }
    searchFun = () =>{
        if(this.state.selected === "" || this.state.text === ""){
            alert("Please enter valid values");
        }
        else{
            let url = ipAddress.ip;
            if(this.state.selected === "Movies"){
                url += '/search_movie?query=' + this.state.text;
            }
            else if(this.state.selected === "TV Shows"){
                url += '/search_tv?query=' + this.state.text;
            }
            else if(this.state.selected === "Movies and TV Shows"){
                url += '/search_multi?query=' + this.state.text;
            }
            store.dispatch(clickSearchDataAsync(url,this.state.selected));
        }
    }
    clearFun = () =>{
        this.setState({
            text:"",
            selected:""
        })
        store.dispatch(clickClear());
    }
    render(){
        return (
            <div className = {style.container}>
                <div className = {style.title}>Search</div>
                    <div className= {style.form_container}>
                        <div className = {style.form_text}>
                            Keyword
                        </div>
                        {this.rendertextarea()}
                    </div>
                    <div className= {style.form_container}>
                        <div className = {style.form_text}>
                            Category
                        </div>
                        {this.renderselect()}
                    </div>
                <div className = {style.button_container}>
                    <button className = {style.button} onClick={this.searchFun}>
                        Search
                    </button>
                    <button className = {style.button} onClick={this.clearFun}>
                        Clear
                    </button>
                </div>
            </div>
        )
    }
}
export default SearchBar