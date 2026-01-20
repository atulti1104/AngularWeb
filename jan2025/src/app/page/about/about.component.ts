

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  selectedState = 'Select a State';
  craftDetails = 'Discover the rich heritage of Indian handmade crafts.';

  showCraft(state: string) {
    this.selectedState = state;

    const crafts: any = {
      'Rajasthan': 'Blue Pottery, Bandhani, Leather Craft',
      'Madhya Pradesh': 'Gond Painting, Dhokra Art',
      'Tamil Nadu': 'Kanchipuram Silk, Tanjore Painting',
      'Odisha': 'Pattachitra Painting, Stone Carving'
    };

    this.craftDetails = crafts[state] || 'Traditional handmade crafts.';
  }
}

