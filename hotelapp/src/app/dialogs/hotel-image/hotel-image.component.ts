import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { HotelImageService } from 'src/app/services/common/models/hotel-image.service';
import { AddHotelImage } from 'src/app/shared/models/hotel-images/add-hotel-image';
import { ListHotelImage } from 'src/app/shared/models/hotel-images/list-hotel-image';

@Component({
  selector: 'app-hotel-image',
  templateUrl: './hotel-image.component.html',
  styleUrls: ['./hotel-image.component.scss']
})
export class HotelImageComponent {
  @ViewChild("imageForm", { static: true }) imageForm: NgForm;
  @Input() data!: { hotelId: number };
  hotelId!: number;
  selectedFiles: File[] = [];
  listImages: ListHotelImage[] = [];

  constructor(
    private imageService: HotelImageService,
    private sweetAlertService: SweetAlertService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getByImage();
  }
  
  getByImage() {
    if (this.data && this.data.hotelId) {
      this.hotelId = this.data.hotelId;
      this.imageService.getHotelImageByHotelId(this.hotelId).then((photos) => {
        this.listImages.push(photos as ListHotelImage);
      });
    }
  }

  onSubmit() {
    if (this.selectedFiles.length === 0 && this.imageForm.valid)
      return;

    const uploads: AddHotelImage[] = [{
      hotelId: this.hotelId,
      files: this.selectedFiles
    }];
    this.imageService.uploadPhoto(uploads, async () => {
      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      if (result.dismiss)
        this.close();
    },
      errror => {
      });
  }

  deletePhoto(id: number) {
    this.imageService.deleteImage(id, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
    },
      error => {
      })
      .then(() => {
        this.listImages = this.listImages.map(photoItem => {
          return photoItem.photos
            ? { ...photoItem, photos: photoItem.photos.filter(photo => photo.id !== id) }
            : photoItem;
        });
      });
  }

  removeImage(index: number) {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && this.areFilesImages(files)) {
      this.uploadFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = Array.from(inputElement.files);
    }
  }

  areFilesImages(files: FileList): boolean {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        return false;
      }
    }
    return true;
  }

  uploadFiles(files: FileList) {
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  close() {
    this.activeModal.close();
  }
}

