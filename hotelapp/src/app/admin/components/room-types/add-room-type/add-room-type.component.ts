import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { AddRoomType } from 'src/app/shared/models/room-types/AddRoomType';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.scss']
})
export class AddRoomTypeComponent implements OnInit {
  createForm: FormGroup;
  createRoomType: AddRoomType;

  constructor(
    private roomTypeService: RoomTypeService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private router: Router,) {
    this.createForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      price: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      capacity: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      detail: new FormControl(null, [Validators.required, Validators.maxLength(520), Validators.minLength(1)]),
      display: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  create() {
    if (this.createForm.valid) {

      const formData = this.createForm.value;
      const roomType: AddRoomType = {
        name: formData.name,
        pricePerNight: formData.price,
        capacity: formData.capacity,
        description: formData.detail,
        display: formData.display,
        currency: "TRY"
      };
      this.roomTypeService.create(roomType, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate(['/Admin', 'Room-Types']);
        }
      }, error => {
      });
    }
  }
}
