import { Component, OnInit } from '@angular/core';
import { Serie } from './serie';
import { dataSeries } from './dataSeries';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  series: Array<Serie> = [];
  constructor(private serieService: SerieService) { }

  data={
    name: "name",
    description: "description",
    webpage: "webpage",
    poster: "poster"
  }

  average: number = 0;

  getSerieList() {
    this.series = dataSeries;
  }

  getSeries() {
    this.serieService.getSeries().subscribe(series => {
      this.series = series;
      this.getAverageSeasons();
    });
  }

  getAverageSeasons() {
    let totalSeasons = 0;
    this.series.forEach((serie) => totalSeasons = totalSeasons + serie.seasons);
    this.average = totalSeasons / this.series.length;
  }

  clicker(serieId: number) {
    let serie = dataSeries[serieId];
    this.data.name = serie.name;
    this.data.description = serie.description;
    this.data.webpage = serie.webpage;
    this.data.poster = serie.poster;
    document.getElementById("card")!.style.display = "block";
  }

  ngOnInit() {
    this.getSeries();
  }

}
