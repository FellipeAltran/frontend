import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  publicKey: string = "775233114571f81211798b1261dda709";
  timeStamp: string = "1669893071";
  md5: string = "bd958ccd0d34840a9af2999cfa9746cf";
  baseUrl: string = "https://gateway.marvel.com:443/v1/public"

  constructor() { 
   }

   makeUrl(offset: number){
    const response = fetch(`${this.baseUrl}/characters?limit=20&offset=${offset}&ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.md5}`);
    return response;
   }
}
