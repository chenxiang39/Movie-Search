import {GetGenre} from '../constant'

const initState = {
    MovieGenre:[],
    TvGenre:[]
}

export default function RightContentReducer(preState=initState,action){
     const {type,data} = action;
     switch (type) {
         case GetGenre:
            return data;
         default:
            return preState;
     }
}