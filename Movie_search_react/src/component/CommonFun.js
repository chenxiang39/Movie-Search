import store from '../redux/store'
export const createGenre = (idArr,type) =>{
    const Tv = store.getState().RightContent.TvGenre.genres;
    const Movie = store.getState().RightContent.MovieGenre.genres;
    let res = "";
    if(idArr === undefined){
        return res;
    }
    if(type === "Movies" || type === "movie"){
        for(let i = 0; i < idArr.length; i++){
            for(let j = 0; j < Movie.length; j++){
                if(idArr[i] === Movie[j].id){
                    res += Movie[j].name
                }
            }
            if(i!== idArr.length - 1){
                res += ', '
            }
        }
    }
    else if(type === "TV Shows" || type === "tv"){
        for(let i = 0; i < idArr.length; i++){
            for(let j = 0; j < Tv.length; j++){
                if(idArr[i] === Tv[j].id){
                    res += Tv[j].name
                }
            }
            if(i!== idArr.length - 1){
                res += ', '
            }
        }
    }
    return res;
}
export const createGenreByArrAndWithoutName = (genresArr) =>{
    let res = "";
    for(let i = 0; i < genresArr.length; i++){
        res += genresArr[i].name;
        if(i!== genresArr.length - 1){
            res += ', '
        }
    }
    return res;
}
export const createVoteScore = (score) =>{
    const voteScore = (score === null ? '' :'★' + (score/10.0 * 5.0).toFixed(2) + '/5');
    return voteScore;
}

export const createDate = (date) =>{
    let createdDate = "";
    if(date != null){
        createdDate += "on ";
        createdDate += date.slice(5,7);
        createdDate += "/";
        createdDate += date.slice(8,10);
        createdDate += "/";
        createdDate += date.slice(0,4);
    }
    return createdDate;
}