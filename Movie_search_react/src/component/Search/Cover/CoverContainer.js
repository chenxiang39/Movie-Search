import React, { Component } from 'react'
import style from './CoverContainer.module.css'
import server from '../../../service/ApiHelper'
import ipAddress from '../../../IpAddress.json'
import {createVoteScore,createGenreByArrAndWithoutName} from '../../CommonFun'
import CoverCast from './CoverCast'
import CoverReview from './CoverReview'
export class CoverContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            detail : {},
            credit : [],
            review : [],
            fetchError : true
        }
    }
    async componentDidMount(){
        let durl = ipAddress.ip;
        let curl = ipAddress.ip;
        let rurl = ipAddress.ip;
        if(this.props.type === "Movies" || this.props.type === "movie"){
            durl += '/get_movie_detail?id=' + this.props.id; 
            curl += '/get_movie_credits?id=' + this.props.id;
            rurl += '/get_movie_reviews?id=' + this.props.id;
        }
        else if(this.props.type === "TV Shows" || this.props.type === "tv"){
            durl += '/get_tv_show_detail?id=' + this.props.id; 
            curl += '/get_tv_show_credits?id=' + this.props.id;
            rurl += '/get_tv_show_reviews?id=' + this.props.id;
        }
        let detail = await server.getUrl(durl);
        let credit = await server.getUrl(curl);
        let review = await server.getUrl(rurl);
        if(detail !== 'error' && credit !== 'error' && review !== 'error'){
            //let component render twice(initial + call setState)
            this.setState({
                detail:detail,
                credit:credit,
                review:review,
                fetchError:false
            })
        }
        else{
            alert("fetch data failed!");
            this.setState({
                fetchError:true
            })
            
        }
    }
    cancelCoverFun = () =>{
        this.props.cancel();
    }
    createGenre = (genresArr) =>{
        let res = "";
        for(let i = 0; i < genresArr.length; i++){
            res += genresArr[i].name;
            if(i!== genresArr.length - 1){
                res += ', '
            }
        }
        return res;
    }
    createLanguage = (languageArr) =>{
        let res = "";
        for(let i = 0; i < languageArr.length; i++){
            res += languageArr[i].english_name;
            if(i!== languageArr.length - 1){
                res += ', '
            }
        }
        return res;
    }
    comeNewPageFun = () => {
        if(this.props.type === "Movies" || this.props.type === "movie"){
            let url = "https://www.themoviedb.org/movie/" + this.props.id;
            window.open(url);
        }
        else if(this.props.type === "TV Shows" || this.props.type === "tv"){
            let url = "https://www.themoviedb.org/tv/" + this.props.id;
            window.open(url);
        }
    }
    render() {
        if(!this.state.fetchError){
            const url = this.state.detail.backdrop_path !== null ? "https://image.tmdb.org/t/p/w780" + this.state.detail.backdrop_path : "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
            const headerImgCss = {
                height : 439 + 'px',
                width : 780 + 'px',
                backgroundImage : 'url(' + url + ')'
            }
            const title = this.state.detail.title
            const basicContent = (this.state.detail.release_date !== null ?this.state.detail.release_date.slice(0,4):'')+ ' | ' + createGenreByArrAndWithoutName(this.state.detail.genres);
            const voteScore = createVoteScore(this.state.detail.vote_average);
            const vote = this.state.detail.vote_count + ' votes';
            const overview = this.props.overview;
            const languages = 'Spoken languages: ' + this.createLanguage(this.state.detail.spoken_languages);
            return (
                <div className = {style.container}>
                    <div className = {style.detailContainer}>
                        <div className = {style.contentContainer}>
                            <div>
                                <div style = {headerImgCss}></div>
                            </div>
                            <div className = {style.contentTitleContainer}>
                                <div className = {style.contentTitleText}>{title}</div>
                                <button className = {style.contentTitleButton}  onClick = {this.comeNewPageFun}>ⓘ</button>
                            </div>
                            <div className = {style.contentIntroGenre}>
                                {basicContent}
                            </div>
                            <div className = {style.contentIntroVoteContainer}>
                                <div className = {style.contentIntroVoteRed}>{voteScore}</div>
                                <div className = {style.contentIntroVoteText}>{vote}</div>
                            </div>
                            <div className = {style.contentOverview}>
                                {overview}
                            </div>
                            <div className = {style.contentLanguage}>
                                {languages}
                            </div>
                            <CoverCast castArr = {this.state.credit}></CoverCast>
                            <CoverReview reviewArr = {this.state.review}></CoverReview>
                        </div>
                        <div className = {style.cancelContainer}>
                            <button className = {style.cancelButton} onClick={this.cancelCoverFun}>✖</button>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>

                </div>
            )
        }
    }
}

export default CoverContainer
