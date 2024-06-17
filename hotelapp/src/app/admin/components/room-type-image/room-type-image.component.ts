import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeImageService } from 'src/app/services/common/models/room-type-image.service';
import { AddRoomTypeImage } from 'src/app/shared/models/room-type-images/add-room-type-image';
import { ListRoomTypeImage } from 'src/app/shared/models/room-type-images/list-room-type-image';

@Component({
  selector: 'app-room-type-image',
  templateUrl: './room-type-image.component.html',
  styleUrls: ['./room-type-image.component.scss']
})
export class RoomTypeImageComponent implements OnInit {
  @ViewChild("imageForm", { static: true }) imageForm: NgForm;
  selectedFiles: File[] = [];
  listImages: ListRoomTypeImage[] = [];
  roomTypeId: number;

  constructor(
    private imageService: RoomTypeImageService, 
    private route: ActivatedRoute, 
    private sweetAlertService: SweetAlertService, 
    private router:Router) { }

  ngOnInit(): void {
    this.getImageAll();
  }

  getImageAll() {
    const params = this.route.snapshot.params;
    this.imageService.getImageRoomTypeById(params['id']).then(roomTypeImage => {
      if (roomTypeImage) {
        this.listImages.push(roomTypeImage as ListRoomTypeImage);
        this.roomTypeId = params['id'];
      }
    });
  }

  onSubmit() {
    if (this.selectedFiles.length === 0 && this.imageForm.valid)
      return;

    const uploads: AddRoomTypeImage[] = [{
      roomTypeId: this.roomTypeId,
      files: this.selectedFiles
    }];
    this.imageService.uploadPhoto(uploads, async () => {
      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      // if (result.dismiss)
      //   this.router.navigate(['/']);  Diğer sayfalar oluşturulduğunda .then yaklaşımı yerine bu kullanılacak.
    },
      errror => {
        this.sweetAlertService.showAlert(SweetStatus.serverError);
      })
      .then(()=>{
        this.getImageAll();  // Diğer sayfalar oluşturulunca burası kaldırılacak.
      });
  }

  deletePhoto(id: number) {
    this.imageService.deleteImage(id, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
    },
      error => {
        this.sweetAlertService.showAlert(SweetStatus.serverError);
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
}
