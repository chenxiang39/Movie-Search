from flask import Flask, request
from flask_cors import CORS
import requests
import json


app = Flask(__name__)
CORS(app)
api_key = "9f3e218257099cb60d77298deec6eb63"
def replaceSpace(str):
    str = str.replace(' ', '%20')
    return str

@app.route("/trending")
def trending():
    media_type = "movie"
    time_window = "week"
    url = "https://api.themoviedb.org/3/trending/" + media_type + "/" + time_window + "?api_key=" + api_key
    results = requests.get(url).json()["results"];
    dataArr = []
    for i in range(0,min(5, len(results))):
        results[i].setdefault("title", None)
        results[i].setdefault("backdrop_path", None)
        results[i].setdefault("release_date", None)
        map = {"title": results[i]["title"],
               "backdrop_path": results[i]["backdrop_path"],
               "release_date":results[i]["release_date"]}
        dataArr.append(map)
    data = {"data" : dataArr}
    return json.dumps(data)


@app.route("/airing")
def airing():
    url = "https://api.themoviedb.org/3/tv/airing_today?api_key=" + api_key
    results = requests.get(url).json()["results"];
    dataArr = []
    for i in range(0, min(5, len(results))):
        results[i].setdefault("name", None)
        results[i].setdefault("backdrop_path", None)
        results[i].setdefault("first_air_date", None)
        map = {"name": results[i]["name"],
               "backdrop_path": results[i]["backdrop_path"],
               "first_air_date": results[i]["first_air_date"]}
        dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)

@app.route("/search_movie")
def search_movie():
    query = request.args.get('query')
    query = replaceSpace(query)
    url = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
    results = requests.get(url).json()["results"];
    dataArr = []
    for i in range(0, min(10, len(results))):
        results[i].setdefault("id", None)
        results[i].setdefault("title", None)
        results[i].setdefault("overview", None)
        results[i].setdefault("poster_path", None)
        results[i].setdefault("release_date", None)
        results[i].setdefault("vote_average", None)
        results[i].setdefault("vote_count", None)
        results[i].setdefault("genre_ids", None)
        map = {"id": results[i]["id"],
               "title": results[i]["title"],
               "overview": results[i]["overview"],
               "poster_path": results[i]["poster_path"],
               "release_date": results[i]["release_date"],
               "vote_average": results[i]["vote_average"],
               "vote_count": results[i]["vote_count"],
               "genre_ids": results[i]["genre_ids"]
               }
        dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)

@app.route("/search_tv")
def search_tv():
    query = request.args.get('query')
    query = replaceSpace(query)
    url = "https://api.themoviedb.org/3/search/tv?api_key=" + api_key + "&language=en-US&page=1&query=" + query + "&include_adult=false"
    results = requests.get(url).json()["results"];
    dataArr = []
    for i in range(0, len(results)):
        results[i].setdefault("id",None)
        results[i].setdefault("name", None)
        results[i].setdefault("overview", None)
        results[i].setdefault("poster_path", None)
        results[i].setdefault("first_air_date", None)
        results[i].setdefault("vote_average", None)
        results[i].setdefault("vote_count", None)
        results[i].setdefault("genre_ids", None)
        map = {"id": results[i]["id"],
               "title": results[i]["name"],
               "overview": results[i]["overview"],
               "poster_path": results[i]["poster_path"],
               "release_date": results[i]["first_air_date"],
               "vote_average": results[i]["vote_average"],
               "vote_count": results[i]["vote_count"],
               "genre_ids": results[i]["genre_ids"]
               }
        dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)

@app.route("/search_multi")
def search_multi():
    query = request.args.get('query')
    query = replaceSpace(query)
    url = "https://api.themoviedb.org/3/search/multi?api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
    results = requests.get(url).json()["results"];
    dataArr = []
    count = 0;
    for i in range(0, len(results)):
        if(count == 10):
            break
        if(results[i]["media_type"] == "tv"):
            results[i].setdefault("id", None)
            results[i].setdefault("name", None)
            results[i].setdefault("overview", None)
            results[i].setdefault("first_air_date", None)
            results[i].setdefault("release_date", None)
            results[i].setdefault("vote_average", None)
            results[i].setdefault("vote_count", None)
            results[i].setdefault("genre_ids", None)
            map = {"id": results[i]["id"],
                   "title": results[i]["name"],
                   "overview": results[i]["overview"],
                   "poster_path": results[i]["poster_path"],
                   "release_date": results[i]["first_air_date"],
                   "vote_average": results[i]["vote_average"],
                   "vote_count": results[i]["vote_count"],
                   "genre_ids": results[i]["genre_ids"],
                   "media_type":results[i]["media_type"]
                   }
            dataArr.append(map)
            count += 1
        elif(results[i]["media_type"] == "movie"):
            results[i].setdefault("id", None)
            results[i].setdefault("title", None)
            results[i].setdefault("overview", None)
            results[i].setdefault("poster_path", None)
            results[i].setdefault("release_date", None)
            results[i].setdefault("vote_average", None)
            results[i].setdefault("vote_count", None)
            results[i].setdefault("genre_ids", None)
            map = {"id": results[i]["id"],
                   "title": results[i]["title"],
                   "overview": results[i]["overview"],
                   "poster_path": results[i]["poster_path"],
                   "release_date": results[i]["release_date"],
                   "vote_average": results[i]["vote_average"],
                   "vote_count": results[i]["vote_count"],
                   "genre_ids": results[i]["genre_ids"],
                   "media_type": results[i]["media_type"]
                   }
            dataArr.append(map)
            count += 1
        else:
            continue
    data = {"data": dataArr}
    return json.dumps(data)

@app.route("/get_movie_detail")
def get_movie_detail():
    id = request.args.get('id')
    url = "https://api.themoviedb.org/3/movie/" + id +"?api_key=" + api_key + "&language=en-US"
    results = requests.get(url).json()
    dataArr = {}
    results.setdefault("id",None);
    results.setdefault("title",None);
    results.setdefault("runtime",None);
    results.setdefault("release_date",None);
    results.setdefault("spoken_languages",None);
    results.setdefault("vote_average",None);
    results.setdefault("vote_count",None);
    results.setdefault("poster_path",None);
    results.setdefault("backdrop_path",None);
    results.setdefault("genres",None);
    dataArr["id"] = results["id"];
    dataArr["title"] = results["title"];
    dataArr["runtime"] = results["runtime"];
    dataArr["release_date"] = results["release_date"];
    dataArr["spoken_languages"] = results["spoken_languages"];
    dataArr["vote_average"] = results["vote_average"];
    dataArr["vote_count"] = results["vote_count"];
    dataArr["poster_path"] = results["poster_path"];
    dataArr["backdrop_path"] = results["backdrop_path"];
    dataArr["genres"] = results["genres"];
    data = {"data": dataArr}
    return json.dumps(data)

@app.route("/get_movie_credits")
def get_movie_credits():
    id = request.args.get('id')
    url = "https://api.themoviedb.org/3/movie/"+ id +"/credits?api_key=" + api_key + "&language=en-US"
    results = requests.get(url).json()["cast"];
    dataArr = []
    for i in range(0, min(8, len(results))):
            results[i].setdefault("name", None)
            results[i].setdefault("profile_path", None)
            results[i].setdefault("character", None)
            map = {"name": results[i]["name"],
                   "profile_path": results[i]["profile_path"],
                   "character": results[i]["character"],
                   }
            dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)


@app.route("/get_movie_reviews")
def get_movie_reviews():
    id = request.args.get('id')
    url = "https://api.themoviedb.org/3/movie/" + id + "/reviews?api_key=" + api_key + "&language=en-US&page=1"
    results = requests.get(url).json()["results"]
    dataArr = []
    for i in range(0, min(5, len(results))):
        results[i].setdefault("content", None)
        results[i].setdefault("created_at", None)
        map = {"username": results[i]["author_details"]["username"],
               "content": results[i]["content"],
               "rating": results[i]["author_details"]["rating"],
               "created_at": results[i]["created_at"]
               }
        dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)

@app.route("/get_tv_show_detail")
def get_tv_show_detail():
    id = request.args.get('id')
    url = "https://api.themoviedb.org/3/tv/" + id +"?api_key=" + api_key + "&language=en-US"
    results = requests.get(url).json()
    dataArr = {}
    results.setdefault("backdrop_path",None);
    results.setdefault("episode_run_time",None);
    results.setdefault("first_air_date",None);
    results.setdefault("genres",None);
    results.setdefault("id",None);
    results.setdefault("name",None);
    results.setdefault("number_of_seasons",None);
    results.setdefault("overview",None);
    results.setdefault("poster_path",None);
    results.setdefault("spoken_languages",None);
    results.setdefault("vote_average",None);
    results.setdefault("vote_count",None);
    dataArr["backdrop_path"] = results["backdrop_path"];
    dataArr["episode_run_time"] = results["episode_run_time"];
    dataArr["release_date"] = results["first_air_date"];
    dataArr["genres"] = results["genres"];
    dataArr["id"] = results["id"];
    dataArr["title"] = results["name"];
    dataArr["number_of_seasons"] = results["number_of_seasons"];
    dataArr["overview"] = results["overview"];
    dataArr["poster_path"] = results["poster_path"];
    dataArr["spoken_languages"] = results["spoken_languages"];
    dataArr["vote_average"] = results["vote_average"];
    dataArr["vote_count"] = results["vote_count"];
    data = {"data": dataArr}
    return json.dumps(data)


@app.route("/get_tv_show_credits")
def get_tv_show_credits():
    id = request.args.get('id')
    url = "https://api.themoviedb.org/3/tv/"+ id +"/credits?api_key=" + api_key + "&language=en-US"
    results = requests.get(url).json()["cast"];
    dataArr = []
    for i in range(0, min(8, len(results))):
            results[i].setdefault("name", None)
            results[i].setdefault("profile_path", None)
            results[i].setdefault("character", None)
            map = {"name": results[i]["name"],
                   "profile_path": results[i]["profile_path"],
                   "character": results[i]["character"],
                   }
            dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)


@app.route("/get_tv_show_reviews")
def get_tv_show_reviews():
    id = request.args.get('id')
    url = "https://api.themoviedb.org/3/tv/" + id + "/reviews?api_key=" + api_key + "&language=en-US&page=1"
    results = requests.get(url).json()["results"]
    dataArr = []
    for i in range(0, min(5, len(results))):
        results[i].setdefault("content", None)
        results[i].setdefault("created_at", None)
        map = {"username": results[i]["author_details"]["username"],
               "content": results[i]["content"],
               "rating": results[i]["author_details"]["rating"],
               "created_at": results[i]["created_at"]
               }
        dataArr.append(map)
    data = {"data": dataArr}
    return json.dumps(data)


@app.route("/get_movie_genre")
def get_movie_genre():
    url = "https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language=en-US"
    results = requests.get(url).json()
    return results;

@app.route("/get_tv_genre")
def get_tv_genre():
    url = "https://api.themoviedb.org/3/genre/tv/list?api_key="+api_key+"&language=en-US"
    results = requests.get(url).json()
    return results;
