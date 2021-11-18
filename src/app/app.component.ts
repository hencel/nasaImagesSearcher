import { Component, OnInit } from '@angular/core';
import { ImageItem, ButtonsArray } from './models/DataModel';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nasaImagesSearcher';

  imagesList: ImageItem[] = [];
  backgroundAddress: any = '';
  buttonsArray: ButtonsArray[] = [];


  constructor(private service: ConfigService) {
    this.service = service;
  }

  ngOnInit() {
    const promisedData = this.service.askJson('https://api.nasa.gov/planetary/apod?api_key=Vt2z1OTUju2KsiPLqKd759q14WMznQFr5DJkrrzL').toPromise();
    const url = promisedData.then((data: any) => {
      for (const [key, value] of Object.entries(data)) {
        if(key == 'url') {
          this.backgroundAddress = value;
        }
      }
    })
  }

  prepareLists(data: ImageItem[]) {
    this.imagesList = this.getImagesList(data);
  }

  getImagesList(array: any) {
    let tempList: ImageItem[] = []; 
    array.forEach((el: any) =>  {
      if(el.links && el.data[0].media_type == 'image') {
        let fullImageLink:string = '';
        const promisedData = this.service.askJson(el.href).toPromise();
        promisedData.then((data)=>{
          fullImageLink = data[0];
          let temp: ImageItem = {preview: el.links[0].href, fullImage: fullImageLink, title: el.data[0].title}
          tempList.push(temp)
        }) 
      }
    });
    return tempList;
  }

  getButtonsArray(data: ButtonsArray[]) {
    //prapared buttons data in app component
  }
}
