import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {}
}
