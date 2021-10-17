import { Component } from '@angular/core';
import { ImageItem } from './models/DataModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nasaImagesSearcher';

  imagesList: ImageItem[] = [];

  prepareLists(data: ImageItem[]) {
    this.imagesList = this.getImagesList(data);
  }

  getImagesList(array: any) {
    let tempList: ImageItem[] = []; 
    array.forEach((el: any) =>  {
      if(el.links && el.data[0].media_type == 'image') {
        let fullImageLink:string = '';
        let temp: ImageItem = {preview: el.links[0].href, fullImage: fullImageLink, title: el.data[0].title};
        tempList.push(temp)
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
    return tempList;
  }
}
