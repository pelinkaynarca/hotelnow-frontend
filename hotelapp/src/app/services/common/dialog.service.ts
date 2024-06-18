import { Injectable } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
    providedIn: 'root'
  })
  export class DialogService {
  
    constructor(private dialog: NgbModal) { }

    openDialog(dialogParameters: Partial<DialogParameters>): void {
        const options: NgbModalOptions = {
          size: dialogParameters.options?.size || 'md',
          backdrop: dialogParameters.options?.backdrop || true,
          centered: dialogParameters.options?.centered || false,
        };
    
        const modalRef = this.dialog.open(dialogParameters.componentType, options);
        if (dialogParameters.data) {
          modalRef.componentInstance.data = dialogParameters.data;
        }
    
        modalRef.result.then(
          (result) => {
            if (dialogParameters.afterClosed) {
              dialogParameters.afterClosed(result);
            }
          },
          (reason) => {
            if (dialogParameters.afterClosed) {
              dialogParameters.afterClosed(reason);
            }
          }
        );
      }
    }

  export class DialogParameters {
    componentType: any;
    data?: any;
    afterClosed?: (result?: any) => void;
    options?: Partial<DialogOptions> = new DialogOptions();
  }
  
  export class DialogOptions {
    size?: 'sm' | 'lg' | 'xl' | 'md' = 'md';
    backdrop?: boolean | 'static' = true;
    centered?: boolean = false;
  }