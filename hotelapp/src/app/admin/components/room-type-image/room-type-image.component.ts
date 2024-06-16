import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  selectedFiles: File[];
  listImages: ListRoomTypeImage[] = [];
  roomTypeId: number;

  constructor(private imageService: RoomTypeImageService, private route: ActivatedRoute) {}

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

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = Array.from(inputElement.files);
    }
  }

  onSubmit() {
    if (this.selectedFiles.length === 0 && this.imageForm.valid)
      return;

    const uploads: AddRoomTypeImage[] = [{ 
        roomTypeId: this.roomTypeId, 
        files: this.selectedFiles 
    }];
      this.imageService.uploadPhoto(uploads);
  }

}
