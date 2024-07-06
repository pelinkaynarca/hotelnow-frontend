import { Pipe, PipeTransform } from "@angular/core";
import { ListImage } from "../models/images/list-image";
import { environment } from "src/environments/environment";

@Pipe({
  name: 'imageArray'
})
export class ImageArrayPipe implements PipeTransform {
  transform(image: ListImage): string {
    if (image) {
      return environment.photoUrl + image.path;
    } else {
      return '';
    }
  }
}
