import { Component } from '@angular/core';
import { HeroesService } from './heroes.service';
import { Heroe } from './heroes.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  constructor(private service: HeroesService) { }

  publicKey: string = "775233114571f81211798b1261dda709";
  timeStamp: string = "1669893071";
  md5: string = "bd958ccd0d34840a9af2999cfa9746cf";
  baseUrl: string = "https://gateway.marvel.com:443/v1/public"

  heroes: Array<Heroe> = []

  ngOnInit(): void {
    this.readResults();
  }

  async readResults(){
    const response = await fetch(`${this.baseUrl}/characters?ts=${this.timeStamp}&apikey=${this.publicKey}&hash=${this.md5}`); 
    const json = await response.json();
    console.log(json)
    const results = json.data.results; 
    this.heroes = results;
  }

  chamarImg(img: string) {
    const urlImg = `${img}/portrait_medium.jpg`;
    return urlImg;
  }
}
