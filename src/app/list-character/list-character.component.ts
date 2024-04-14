import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../service/characters.service';
import { ApiResponse } from '../characters.interface';
import { DataTableComponent } from '../data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-list-character',
  standalone: true,
  imports: [DataTableComponent,CommonModule, TitleComponent],
  templateUrl: './list-character.component.html',
  styleUrl: './list-character.component.css'
})
export class ListCharacterComponent implements OnInit {
  ApiResponse: ApiResponse | undefined;
  selectedCharacter: any;
  currentPage: number = 1;
  search = {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  };

  constructor(private characterService: CharacterService, private searchService: SearchService) { 
    this.searchService.search$.subscribe(newSearch => {
      this.search = newSearch;
      this.getFilteredCharacters(newSearch, 1);
    });
  }

  ngOnInit(): void {
    this.getAllCharacters(1);
  }

  getAllCharacters(page: number): void {
    this.currentPage = page;
    this.characterService.getAllCharacters(page).subscribe((data:any) => this.ApiResponse = data);
  }
  
  openModal(character: any) {
    this.selectedCharacter = { ...character };
  }

  getPageNumber(url: string): number {
    const urlParts = new URLSearchParams(new URL(url).search);
    return Number(urlParts.get('page'));
  }

  getFilteredCharacters(search: any, page:number): void {
    this.currentPage = page;
    const currentSearch = this.searchService.getSearch();
    this.characterService.getFilteredCharacters(currentSearch.name, currentSearch.status, currentSearch.species, currentSearch.type, currentSearch.gender, page)
    .subscribe((data:any) => {this.ApiResponse = data;})
  }
}
