import {ClickClear, ClickSearchData} from '../constant'
import server from '../../service/ApiHelper'
export const clickClear = () =>{
    return {type:ClickClear, data:''};
}
const clickSearchData = (data) =>{
    return {type:ClickSearchData, data:data}
}
export const clickSearchDataAsync = (url,type) =>{
    return async (dispatch)=>{
        let searchData = await server.getUrl(url);
        if(searchData !== "error"){
            const data = {};
            if(searchData.length === 0){
                data.resultState = 'not_found';
            }
            else{
                data.resultState = 'found';
            }
            data.searchlist = searchData;
            data.searchType = type;
            dispatch(clickSearchData(data));
        }
        else{
            alert("fetch data failed!");
            dispatch(clickClear());
        }
    }
}