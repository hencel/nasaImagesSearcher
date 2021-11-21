import { Component, OnInit, Input } from '@angular/core';
import { ImageItem, ButtonsArray } from './models/DataModel';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nasaImagesSearcher';

  configUrl:string = 'https://images-api.nasa.gov/search?q=';

  imagesList: ImageItem[] = [];
  backgroundAddress: any = '';
  buttonsArray: ButtonsArray[] = [];
  buttonStatusPrev:boolean = false;
  buttonStatusNext:boolean = false;

  @Input() buttonTextPrev: string = 'Prev';
  @Input() buttonTextNext: string = 'Next'
  @Input() buttonClasses: string = 'btn btn-primary btn-lg mx-2';
  @Input() buttonAddressPrev: string = '';
  @Input() buttonAddressNext: string = ''
  @Input() searchedText: string = '';

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

  searchInit(searchedText: string) {
    this.subscribeData(`${this.configUrl}${searchedText}`)
  }

  subscribeData(address: string):void { 
    this.service.askApi(address).subscribe((res) => {
      if(res.collection.items.length > 0) {
        this.imagesList = this.getImagesList(res.collection.items);
      }
      if(res.collection.links.length > 0 ) {
        this.showButtonsArray(res.collection.links);

      }
    });
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

  showButtonsArray(data: ButtonsArray[]) {
    data.forEach((el:any) => {
      if(el.rel == 'prev') {
        this.buttonStatusPrev = true;
        this.buttonAddressPrev= this.changeHttpToHttps(el.href)
      } else {
        this.buttonStatusNext = true;
        this.buttonAddressNext = this.changeHttpToHttps(el.href)
      }
    })
  }

  changeHttpToHttps(text: string) {
    return text.replace('http', 'https')
  }

  openOtherPage(event:any) {
    event.target.id == 'next' ? 
    this.subscribeData(this.buttonAddressNext) :
    this.subscribeData(this.buttonAddressPrev)
  }
}
