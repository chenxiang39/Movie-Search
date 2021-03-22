import React from 'react'
import style from './Slide.module.css'
class Slide extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0,
            slideFlag:true  //转换slide样式，达到每次图片进场播放动画
        }
        this.getIntro = this.getIntro.bind(this);
    }
    //组件第一次挂载时调用,比如按了search之后再按home(因为按了search后该组件会被销毁)，即进home页面时
    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState({
                slideIndex : ( this.state.slideIndex + 1 ) % (this.props.slideInfoArr.length),
                slideFlag : !this.state.slideFlag
            })
        }, 4000);
    }
    //组件重新渲染（比如state更新后,轮播图换了图像）调用
    componentDidUpdate(){
        
    }
    //组件将要被卸载时调用，比如按了search按钮
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    getIntro(){
        let cur = this.props.slideInfoArr[this.state.slideIndex];
        let Intro
        if(this.props.title === "Trending Movies"){
            Intro = cur.title + ' (' + (cur.release_date != null ?  cur.release_date.slice(0,4) : '') + ')';
        }
        else if(this.props.title === "TV Shows On-Air-Today"){
            Intro = cur.name + ' (' + (cur.first_air_date != null ?  cur.first_air_date.slice(0,4) : '') + ')';
        }
        return Intro; 
    }
    renderSlide = () =>{
        let cur = this.props.slideInfoArr[this.state.slideIndex];
        let url = cur.backdrop_path != null ?  "https://image.tmdb.org/t/p/w780" + cur.backdrop_path : "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
        let imgStyle = {
            backgroundImage: 'url(' + url + ')',
        }
        let Intro = this.getIntro();
        return (
            <div className={this.state.slideFlag ? style.img : style.img_copy} style = {imgStyle}>
                <div className={style.intro}>{Intro}</div>
            </div>
        )
    }
    render(){
        if(this.props.slideInfoArr.length !== 0){
            return (
                <div>
                    <div className={style.header}>
                        {this.props.title}
                    </div>
                    {this.renderSlide()}
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
export default Slide;