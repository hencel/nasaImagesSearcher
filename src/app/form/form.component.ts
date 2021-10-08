import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() placeholderText: string = '';
  @Input() buttonText: string = '';
  @Input() buttonClasses: string = '';

  submitValue: string = '';

  clickSubmit(value: string) {
    if(value.length > 0) {
      console.log(`Searched text: ${value}`)
    }
    
  }

}
