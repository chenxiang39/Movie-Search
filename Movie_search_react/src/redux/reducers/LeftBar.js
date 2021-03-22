import {ClickHome,ClickSearch} from '../constant'
const initSelected = 'Home'
//当preState为undefined时，使用初始值
function leftbarReducer(preState=initSelected, action) {
    const {type} = action
    switch (type) {
        case ClickHome:
            return 'Home';
        case ClickSearch:
            return 'Search';
        //初始化,使用默认值
        default:
            return preState;
    }
}
export default leftbarReducer;