import React, { Component } from 'react'
import style from './SearchItem.module.css'
import CoverContainer from './Cover/CoverContainer';
import {createGenre,createVoteScore} from '../CommonFun'
export class SearchItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCover:false
        }
    }
    cancelCoverFun = () =>{
        this.setState({
            showCover:false
        })
    }
    showMoreFun = () =>{
        this.setState({
            showCover:true
        })
    }
    render() {
        const data = this.props.data;
        const url = (data.poster_path === null ? "https://cinemaone.net/images/movie_placeholder.png" : 'https://image.tmdb.org/t/p/w185/' + data.poster_path)
        const imgStyle = {
            height: 278 + 'px',
            width: 185+ 'px',
            backgroundImage: 'url(' + url + ')',
        }
        const basicContent = (data.release_date !== null ?data.release_date.slice(0,4):'')+ ' | ' + createGenre(data.genre_ids,this.props.type);
        const voteScore = createVoteScore(data.vote_average);
        const vote = data.vote_count + ' votes';
        const overview = data.overview;
        return (
            <div className = {style.container}>
                <div className = {style.imgContainer}>
                    <div style = {imgStyle}></div>
                </div>
                <div className = {style.introContainer}>
                    <div className = {style.introTitle}>{data.title}</div>
                    <div className = {style.introBasicContent}>
                        <div className={style.introBasicContentText}>
                            {basicContent}
                        </div>
                        <div className={style.introBasicContentTextVoteTextContainer}>
                            <div className = {style.introBasicContentTextVoteTextContainerRed}>{voteScore}</div>
                            <div className = {style.introBasicContentTextVoteTextContainerWhite}>{vote}</div>
                        </div>
                    </div>
                    <div className = {style.introOverview}>
                        {overview}
                    </div>
                    <button className = {style.introShowButton} onClick = {this.showMoreFun}>Show more</button>
                </div>
                {this.state.showCover === true ? <CoverContainer id = {this.props.data.id} type = {this.props.type} overview = {overview} cancel = {this.cancelCoverFun}></CoverContainer>:''}
            </div>
        )
    }
}

export default SearchItem
