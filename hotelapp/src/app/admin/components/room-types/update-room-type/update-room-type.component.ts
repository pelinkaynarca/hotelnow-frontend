import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomBedTypeService } from 'src/app/services/common/models/room-bed-type.service';
import { RoomTypeService } from 'src/app/services/common/models/room-type.service';
import { RoomViewTypeService } from 'src/app/services/common/models/room-view-type.service';
import { ListRoomBedType } from 'src/app/shared/models/room-bed-types/list-bed-type';
import { ListRoomType } from 'src/app/shared/models/room-types/ListRoomType';
import { UpdateRoomType } from 'src/app/shared/models/room-types/UpdateRoomType';
import { ListRoomViewType } from 'src/app/shared/models/room-view-types/list-room-view-type';
import { selectValidator } from 'src/app/shared/validators/required.validator';

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
  listBedTypes: ListRoomBedType[];
  listViewTypes: ListRoomViewType[];
  

  constructor(
    private roomTypeService: RoomTypeService,
    private sweetAlertService: SweetAlertService,
    private bedTypeService: RoomBedTypeService,
    private viewTypeService: RoomViewTypeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
    this.updateForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      price: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      bedTypeId: new FormControl(null, selectValidator()),
      viewTypeId: new FormControl(null, selectValidator()),
      size: new FormControl(0, [Validators.required, Validators.min(10)]),
      capacity: new FormControl(0, [Validators.required, Validators.max(300), Validators.min(1)]),
      detail: new FormControl(null, [Validators.required, Validators.maxLength(520), Validators.minLength(1)]),
      display: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getById();
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
        size: roomType.size,
        bedTypeName: roomType.bedTypeName,
        viewTypeName: roomType.viewTypeName,
        capacity: roomType.capacity,
        detail: roomType.description,
        display: roomType.display
      });
    })
  }

  isValid(formControlName: string) {
    const formControl = this.updateForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }

  update() {
    if (this.updateForm.valid) {

      const formData = this.updateForm.value;
      const roomType: UpdateRoomType = {
        id: this.roomTypeId,
        name: formData.name,
        pricePerNight: formData.price,
        bedTypeId: formData.badTypeId,
        viewTypeId: formData.viewTypeId,
        size: formData.size,
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
