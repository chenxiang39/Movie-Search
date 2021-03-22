import {applyMiddleware, createStore,combineReducers} from 'redux'
//default expose(because only one reducer object)
import LeftBarReducer from './reducers/LeftBar'
import SearchContainerReducer from './reducers/SearchContainer'
import RightContentReducer from './reducers/RightContent'
import thunk from 'redux-thunk'

const allReducer = combineReducers({
    leftbar: LeftBarReducer,
    SearchContainer: SearchContainerReducer,
    RightContent: RightContentReducer
})

const store = createStore(allReducer,applyMiddleware(thunk));




export default store;


