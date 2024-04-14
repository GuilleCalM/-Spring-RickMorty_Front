import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() selectedCharacter: any;

  countEpisodeAppearances(): number {
    if (this.selectedCharacter && this.selectedCharacter.episode) {
      return new Set(this.selectedCharacter.episode).size;
    }
    return 0;
  }
}
