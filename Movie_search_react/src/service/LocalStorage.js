export const saveLocalGenre = (MovieGenre, TvGenre, expireTime) =>{
    localStorage.setItem('MovieGenre',JSON.stringify(MovieGenre));
    localStorage.setItem('TvGenre',JSON.stringify(TvGenre));
    localStorage.setItem('GenreSaveTime', new Date().getTime());
    localStorage.setItem('expireTime',expireTime);
    setTimeout(()=>{
        clearLocalGenre();
    },expireTime)
    
}

export const getLocalGenre = () =>{
    let genre = {};
    if( new Date().getTime() - localStorage.getItem('GenreSaveTime') <= localStorage.getItem('expireTime')){
        genre = {
            MovieGenre : JSON.parse(localStorage.getItem('MovieGenre')),
            TvGenre : JSON.parse(localStorage.getItem('TvGenre'))
        }
    }
    else{
         clearLocalGenre();
    }
    return genre;
}

export const clearLocalGenre = () =>{
    localStorage.removeItem('MovieGenre');
    localStorage.removeItem('TvGenre');
    localStorage.removeItem('GenreSaveTime');
    localStorage.removeItem('expireTime');
}
