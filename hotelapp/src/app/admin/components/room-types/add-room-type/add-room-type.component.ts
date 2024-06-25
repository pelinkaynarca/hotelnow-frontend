import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomBedTypeService } from 'src/app/services/common/models/room-bed-type.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { RoomViewTypeService } from 'src/app/services/common/models/room-view-type.service';
import { ListRoomBedType } from 'src/app/shared/models/room-bed-types/list-bed-type';
import { AddRoomType } from 'src/app/shared/models/room-types/AddRoomType';
import { ListRoomViewType } from 'src/app/shared/models/room-view-types/list-room-view-type';
import { selectValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.scss']
})
export class AddRoomTypeComponent implements OnInit {
  createForm: FormGroup;
  createRoomType: AddRoomType;
  listBedTypes: ListRoomBedType[];
  listViewTypes: ListRoomViewType[];

  constructor(
    private roomTypeService: RoomTypeService,
    private sweetAlertService: SweetAlertService,
    private bedTypeService: RoomBedTypeService,
    private viewTypeService: RoomViewTypeService,
    private fb: FormBuilder,
    private router: Router,) {
    this.createForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      price: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      bedTypeId: new FormControl('0', selectValidator()),
      viewTypeId: new FormControl('0', selectValidator()),
      size: new FormControl(0, [Validators.required, Validators.min(10)]),
      capacity: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      detail: new FormControl(null, [Validators.required, Validators.maxLength(520), Validators.minLength(1)]),
      display: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getAllBedType();
    this.getAllViewType();
  }

  async getAllBedType(){
    return this.bedTypeService.getAll().then(bedTypesData => {
      this.listBedTypes = bedTypesData as ListRoomBedType[];
    })
  }

  async getAllViewType(){
    return this.viewTypeService.getAll().then(viewTypesData => {
      this.listViewTypes = viewTypesData as ListRoomViewType[];
    })
  }

  isValid(formControlName: string) {
    const formControl = this.createForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }

  create() {
    if (this.createForm.valid) {

      const formData = this.createForm.value;
      const roomType: AddRoomType = {
        name: formData.name,
        pricePerNight: formData.price,
        bedTypeId: formData.bedTypeId,
        viewTypeId: formData.viewTypeId,
        size: formData.size,
        capacity: formData.capacity,
        description: formData.detail,
        display: formData.display,
        currency: "TRY"
      };
      this.roomTypeService.create(roomType, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate(['/admin', 'room-types']);
        }
      }, error => {
      });
    }
  }
}
