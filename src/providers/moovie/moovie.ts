import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "mooviesapi";

  constructor(
    public http: HttpClient,
    private platform: Platform
    ) {
    console.log('Hello MoovieProvider Provider');
    if (platform.is('cordova')){
      this.baseApiPath = "https://api.themoviedb.org/3";
    }
  }

  getLatestMoovies(page =1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey());
  }

  getMovieDetails(filmeid){
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.getApiKey());
  }

  getApiKey(): string{
    return "d4b87f37500eb69e9d3f27a9f8dfea9c";
  }

}
