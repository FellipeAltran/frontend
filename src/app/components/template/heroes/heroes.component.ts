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

  heroes: Array<Heroe> = [];

  offset: number = 0;

  ngOnInit(): void {
    this.readResults();
  }

  async readResults(){ 
    const response = await this.service.makeUrl(this.offset);
    const json = await response.json();
    console.log(json);
    const results = json.data.results; 
    
    results.forEach((element: any) => {
      if(!element.thumbnail.path.includes('image_not_available') && (element.description != '')){
        this.heroes.push(element)
      }
    });
  }

  callMoreHeroes(){
    this.offset = this.offset + 20;
    this.readResults();
  }


  chamarImg(img: string) {
    const urlImg = `${img}/portrait_medium.jpg`;
    return urlImg;
  }
}
