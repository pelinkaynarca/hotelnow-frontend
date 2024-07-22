import { Pipe, PipeTransform } from "@angular/core";
import { ListImage } from "../models/images/list-image";
import { environment } from "src/environments/environment";

@Pipe({
  name: 'imagesArray'
})
export class ImagesArrayPipe implements PipeTransform {
    transform(images: ListImage[]): string[] {
        if (images && images.length > 0) {
          return images.map(image => environment.photoUrl + image.path);
        } else {
          return [];
        }
      }
      
}
