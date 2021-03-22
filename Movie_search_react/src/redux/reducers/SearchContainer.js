import {ClickSearchData,ClickClear} from '../constant'
const initState = {
    searchlist:[],
    resultState:'space',
    searchType:''
}
export default function SearchBarReducer(preState=initState, action){
    const {type,data} = action;
    switch (type) {
        case ClickSearchData:
            return data;
        case ClickClear:
            preState.resultState = 'space';
            preState.searchlist = [];
            preState.searchType = '';
            return preState
        default:
            return initState
    }
}