import React, { Component } from 'react'
import SearchResult from './SearchResult'
import style from './SearchContainer.module.css'
import store from '../../redux/store'
export class SearchContainer extends Component {
    renderNotFound = () =>{
        return (
            <div className = {style.notFoundContainer}>
                No results found.
            </div>
        )
    }
    renderFound = () =>{
        return (
            <SearchResult></SearchResult>
        )
    }
    render() {
        let show = null;
        let resultState = store.getState().SearchContainer.resultState;
        if(resultState === 'not_found'){
            show = this.renderNotFound();
        }
        else if(resultState === 'found'){
            show = this.renderFound();
        }
        return (
            <div className = {style.container}>
                {show}
            </div>
        )
    }
}

export default SearchContainer

