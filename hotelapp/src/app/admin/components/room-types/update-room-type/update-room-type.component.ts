import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';
import { UpdateRoomType } from 'src/app/shared/models/room-types/UpdateRoomType';

@Component({
  selector: 'app-update-room-type',
  templateUrl: './update-room-type.component.html',
  styleUrls: ['./update-room-type.component.scss']
})
export class UpdateRoomTypeComponent implements OnInit {
  updateForm: FormGroup;
  createRoomType: UpdateRoomType;
  listRoomType: ListRoomType;
  roomTypeId: number;

  constructor(
    private roomTypeService: RoomTypeService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
    this.updateForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      price: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      capacity: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      detail: new FormControl(null, [Validators.required, Validators.maxLength(520), Validators.minLength(1)]),
      display: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    const id = this.route.snapshot.params['id'];

    this.roomTypeService.getById(id).then((roomType: ListRoomType | string) => {
      if (typeof roomType === 'string')
        return;

      this.listRoomType = roomType;
      this.roomTypeId = id;

      this.updateForm.patchValue({
        name: roomType.name,
        price: roomType.pricePerNight,
        capacity: roomType.capacity,
        detail: roomType.description,
        display: roomType.display
      });
    })
  }

  update() {
    if (this.updateForm.valid) {

      const formData = this.updateForm.value;
      const roomType: UpdateRoomType = {
        id: this.roomTypeId,
        name: formData.name,
        pricePerNight: formData.price,
        capacity: formData.capacity,
        description: formData.detail,
        display: formData.display,
        currency: "TRY"
      };
      this.roomTypeService.update(roomType, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate(['/room-types']);
        }
      }, error => {
      });
    }
  }
}
