import { Injectable } from '@angular/core';
import { SweetAlert_Option } from 'src/app/base/sweet-alert/sweet-alert-option';
import Swal, { SweetAlertIcon, SweetAlertPosition, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  async showAlert(options: Partial<SweetAlert_Option>){
    const result: SweetAlertResult<any> = await Swal.fire({
      position: options.position as SweetAlertPosition,
      title: options.messageTitle,
      text: options.messageText, 
      icon: options.icon as SweetAlertIcon,
      showConfirmButton: options.showConfirmButton,
      showCancelButton: options.showCancelButton,
      confirmButtonText: options.confirmButtonText,
      cancelButtonText: options.cancelButtonText,
      timerProgressBar: options.timerProgressBar,
      toast: options.toast,
      timer: options.delay !== undefined ? options.delay * 1000 : undefined
    });
    return result;
  }
}
