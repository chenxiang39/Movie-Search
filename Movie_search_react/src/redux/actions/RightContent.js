import {GetGenre} from '../constant'
import server from '../../service/ApiHelper'
import ipAddress from '../../IpAddress.json'
import {clearLocalGenre, getLocalGenre,saveLocalGenre} from '../../service/LocalStorage'
const getGenre = (data) =>{
    return {type:GetGenre,data:data};
}
export const getGenreAsync = () =>{
    return async (dispatch)=>{
        const genre = getLocalGenre();
        if(JSON.stringify(genre) !== "{}"){
            const data = {};
            data.MovieGenre = genre.MovieGenre;
            data.TvGenre = genre.TvGenre;
            dispatch(getGenre(data));
        }
        else{
            let murl = ipAddress.ip + '/get_movie_genre'
            let turl = ipAddress.ip + '/get_tv_genre'
            let MovieGenre = await server.getUrlWithoutDataLabel(murl);
            let TvGenre = await server.getUrlWithoutDataLabel(turl);
            if(MovieGenre !== "error" && TvGenre !== "error"){
                const data = {};
                data.MovieGenre = MovieGenre;
                data.TvGenre = TvGenre;
                saveLocalGenre(MovieGenre,TvGenre,10000);
                dispatch(getGenre(data));
            }
            else{
                alert("fetch data failed!");
                let data = {
                    MovieGenre:[],
                    TvGenre:[]
                }
            }
        }
    }
}
