import React from 'react';
import BottomBar from './BottomBar'
import Slide from '../Home/Slide';
import SearchBar from '../Search/SearchBar'
import SearchContainer from '../Search/SearchContainer'
import style from './RightContent.module.css';
import server from '../../service/ApiHelper'
import IpAddress from '../../IpAddress.json'
import store from '../../redux/store';
import { getGenreAsync } from '../../redux/actions/RightContent';
class RightContent extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            trendingInfoArr :[],
            airingInfoArr:[],
            fetchError : false
        }
        this.renderHome = this.renderHome.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
    }
    async componentDidMount(){
        //fetch data
        let trendUrl = IpAddress.ip + '/trending';
        let airingUrl = IpAddress.ip + '/airing';
        let trendingData = await server.getUrl(trendUrl)
        let airingData = await server.getUrl(airingUrl)
        if(airingData !== "error" && trendingData !== "error"){
            this.setState({
                trendingInfoArr: trendingData,
                airingInfoArr: airingData,
                fetchError:false
            })
        }
        else{
            alert("fetch data failed!");
            this.setState({
                fetchError:true
            })
        }
        store.dispatch(getGenreAsync());
    }
    
    renderHome(){
        return (
            <div>
                <Slide title = "Trending Movies" slideInfoArr = {this.state.trendingInfoArr}></Slide>
                    <div style = {{height:'9vh',width:'100%'}}></div>
                <Slide title = "TV Shows On-Air-Today" slideInfoArr = {this.state.airingInfoArr}></Slide>
                    <div style = {{height:'9vh',width:'100%'}}></div>
            </div>
        )
    }
    renderSearch(){
        return(
            <div className = {style.search_container}>
                <SearchBar></SearchBar>
                <SearchContainer></SearchContainer>
            </div>
        )
    }
    render(){
        // if(!this.state.fetchError){
            return (
                <div className = {style.container}>
                    {
                        store.getState().leftbar === "Home" ? this.renderHome() : this.renderSearch()
                    }
                    <BottomBar/>
                </div> 
            )
        // }
        // else{
        //     return (
        //         <div></div>
        //     )
        // }
    }
}

export default RightContent;