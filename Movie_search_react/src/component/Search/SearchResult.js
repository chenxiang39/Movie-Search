import React, { Component } from 'react'
import store from '../../redux/store'
import SearchItem from './SearchItem'
import style from './SearchResult.module.css'
export class SearchResult extends Component {
    renderlist = () =>{
        const list = store.getState().SearchContainer.searchlist;
        return list.map((cur,index) =>
            {
                const type = (cur.media_type !== undefined ? cur.media_type : store.getState().SearchContainer.searchType)
                return <SearchItem data = {cur} key = {index} type = {type}></SearchItem>
            }
            
        );
    }
    render() {
        return (
            <div className = {style.container}>
                <div className = {style.title}>
                    Showing results...
                </div>
                <div className = {style.listContainer}>
                    {this.renderlist()}
                </div>
            </div>
        )
    }
}

export default SearchResult
