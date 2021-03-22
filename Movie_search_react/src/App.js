import React from 'react';
import style from './App.module.css';
import Header from './component/Header'
import Content from './component/Content';
import CoverContainer from './component/Search/Cover/CoverContainer'
import store from './redux/store'
class App extends React.Component{
    //diff algorithm can guarantee that most components will not be rendered repeatedly
    //although l render whole app
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({})
        })
    }
    render(){
        return (
            <div className = {style.container}>
                <Header/>
                <Content/>
            </div> 
        )
    }
}

export default App;
