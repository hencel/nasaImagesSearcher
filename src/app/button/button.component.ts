import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonClasses:string = '';
  @Input() buttonText: string = '';

  @Output() clickSubmit = new EventEmitter<void>();

}
