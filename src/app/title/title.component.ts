import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent{

  search = {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  };

  constructor(private searchService: SearchService) { }

  searchCharacter() {
    this.searchService.setSearch(this.search);
  }
}
