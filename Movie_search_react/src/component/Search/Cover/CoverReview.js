import React, { Component } from 'react'
import style from './CoverReview.module.css'
import {createDate,createVoteScore} from '../../CommonFun'
export class CoverReview extends Component {
    renderItem = () => {
        return this.props.reviewArr.map((cur,index)=>{           
            const username = cur.username;
            const date = createDate(cur.created_at);
            const vote = createVoteScore(cur.rating)
            const content = cur.content;
            return (
                <div key = {index} className = {style.itemContainer}>
                    <div className = {style.itemTitle}>
                        <div>{username}</div>
                        <div className = {style.itemDate}>{date}</div>
                    </div>
                    <div className = {style.itemVote}>{vote}</div>
                    <div className = {style.itemOverview}>{content}</div>
                    <div className = {style.itemLine}></div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className = {style.container}>
                <div className = {style.title}>Reviews</div>
                {this.renderItem()}         
            </div>
        )
    }
}

export default CoverReview
