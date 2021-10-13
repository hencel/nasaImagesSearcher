import { Component, Input } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ImageItem } from '../models/DataModel';

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

  valueToSubmit: string = '';
  imagesList: Array<ImageItem> = [];

  onKey(event: any) {
    this.valueToSubmit = event.target.value;
  }


  clickSubmit() {
    if(this.valueToSubmit.length > 0) {
      this.submitData(this.valueToSubmit);
    }
  }

  enterClick() {
    event?.preventDefault();
    this.clickSubmit();
  }

  submitData(text: string):void {
    this.service.askApi(text).subscribe((res) => {
      if(res.collection.items.length > 0) {
        this.getImagesList(res.collection.items);
      }
    });
  }

  getImagesList(array: any) {
    array.forEach((el: any) => {
      if(el.links && el.data[0].media_type == 'image') {
        let i:number = 0;
        let fullImageLink:string = '';
        let temp: ImageItem = {preview: el.links[0].href, fullImage: fullImageLink, title: el.data[0].title};
        this.imagesList.push(temp)
        i++;
        // const promisedData = this.service.askJson(el.href).toPromise();
        // promisedData.then((data)=>{
        //   fullImageLink = data[0];
        //   previewImageLink = data[3];
        //   title = el.data[0].title;
        //   let temp: ImageItem = {preview: previewImageLink , fullImage: fullImageLink, title: title};
        //   // console.log(temp)
        // }) 
      }
    });
    console.log(this.imagesList)
  }

}
