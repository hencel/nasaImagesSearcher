import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ImageItem, ButtonsArray } from '../models/DataModel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers:  [ ConfigService ]
})
export class FormComponent {
  @Input() placeholderText: string = '';
  @Input() buttonText: string = '';
  @Input() buttonClasses: string = '';

  @Output() inputText = new EventEmitter<string>();

  // @Output() prepareLists = new EventEmitter< ImageItem[] >();
  // @Output() buttonsArray = new EventEmitter< ButtonsArray[]>();

  constructor(private service: ConfigService) {
    this.service = service;
  }

  valueToSubmit: string = '';

  onKey(event: any) {
    this.valueToSubmit = event.target.value;
  }


  clickSubmit() {
    if(this.valueToSubmit.length > 0) {
      this.inputText.emit(this.valueToSubmit);
    }
  }

  enterClick() {
    event?.preventDefault();
    this.clickSubmit();
  }

}
