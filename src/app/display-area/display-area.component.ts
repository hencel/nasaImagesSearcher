import { Component, Input } from '@angular/core';
import { ImageItem } from '../models/DataModel';

@Component({
  selector: 'app-display-area',
  templateUrl: './display-area.component.html',
  styleUrls: ['./display-area.component.scss']
})
export class DisplayAreaComponent {

  @Input() imagesList: ImageItem[] = [];
  @Input() errorMessage: string = '';

}
