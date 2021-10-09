import { Component, Input } from '@angular/core';
import { ConfigService } from '../services/config.service';

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

  constructor(private service: ConfigService) {
    this.service = service;
  }

  submitValue: string = '';

  clickSubmit(value: string) {
    if(value.length > 0) {
      this.submitValue = value;
      this.submitData(value);
    }
  }

  submitData(text: string):void {
    this.service.askApi(text).subscribe((res) => {
      console.log(res)
    });;
  }

}
