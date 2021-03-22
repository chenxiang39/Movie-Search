import {ClickHome,ClickSearch} from '../constant'
export const clickHome = function clickHome(data) {
    return {type:ClickHome,data: data}
}
//equal return {type:'Home',data}
//clickHome = () => ({type:'Home',data})

export const clickSearch = function clickSearch(data) {
    return {type:ClickSearch,data:data}
}

//asynchronous function(return function, not obj)
export const clickSearchAsync = (data,time) => {
    //have dispatch, no need to use store.dispatch
    return (dispatch) =>{
        setTimeout(()=>{
            dispatch(clickSearch(data))
        },time)
    }
}
