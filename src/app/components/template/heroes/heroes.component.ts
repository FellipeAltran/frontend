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

  aux: number = 0;
  
  index: number = 0;

  offset: number = 0;

  ngOnInit(): void {
    this.readResults();
  }

  async readResults() {
    this.aux = 0;

    do {

      console.log(this.offset)
      const response = await this.service.makeUrl(this.offset);
      const json = await response.json();
      const results = json.data.results;

      let index = 0;
      do {
        if (!results[index].thumbnail.path.includes('image_not_available') && (results[index].description != '')) {
          this.heroes.push(results[index]);
          this.aux++;
        }
        index++;
      } while (this.aux != 4 && index <= 19);
      this.offset = this.offset + index;

    } while (this.aux != 4);
  }

  callMoreHeroes() {
    this.readResults();
  }

  chamarImg(img: string) {
    const urlImg = `${img}/portrait_medium.jpg`;
    return urlImg;
  }
}
