import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomBedTypeService } from 'src/app/services/common/models/room-bed-type.service';
import { AddRoomBedType } from 'src/app/shared/models/room-bed-types/add-bed-type';
import { ListRoomBedType } from 'src/app/shared/models/room-bed-types/list-bed-type';
import { UpdateRoomBedType } from 'src/app/shared/models/room-bed-types/update-bed-type';


@Component({
  selector: 'app-room-bed-type',
  templateUrl: './room-bed-type.component.html',
  styleUrls: ['./room-bed-type.component.scss']
})
export class RoomBedTypeComponent implements OnInit{
  @ViewChild("bedTypeForm", { static: true }) bedTypeForm: NgForm
  listBedTypes: ListRoomBedType[] = [];
  updateBedType: UpdateRoomBedType;
  showCreateFormFlag: boolean;
  editBedTypeId: number;
  addBedType: AddRoomBedType;

  constructor(
    private roomBedTypeService: RoomBedTypeService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    return this.roomBedTypeService.getAll().then(badTypesData => {
      this.listBedTypes = badTypesData as ListRoomBedType[];
    })
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.addBedType = { name: '' };
  }

  onSubmit() {
    if (!this.bedTypeForm.valid) {
      return;
    }

    const formData = this.bedTypeForm.value;
    const badType: AddRoomBedType = {
      name: formData.name
    };

    this.roomBedTypeService.create(badType, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
     
    }, error => {
    }).then(()=>{
      this.getAll();
      this.showCreateFormFlag = false;
    })
  }

  showUpdateForm(bedTypeId: number) {
    const bedTypeItem = this.listBedTypes.find(item => item.id === bedTypeId);
    if (bedTypeItem) {
      this.editBedTypeId = bedTypeId;
      this.updateBedType = {...bedTypeItem};
      this.showCreateFormFlag = false;
    }
  }

  update(bedTypeId: number, action: string) {
    if (action === 'check' && this.bedTypeForm.valid && this.editBedTypeId !== null) {
      const updateBadType: UpdateRoomBedType = {
        id: bedTypeId,
        name: this.updateBedType.name
      };

      this.roomBedTypeService.update(updateBadType, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
          this.editBedTypeId = null;
        });
    } else if (action === 'cancel') {
      this.editBedTypeId = null;
    }
    this.getAll();
  }

  async delete(bedTypeId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.roomBedTypeService.delete(bedTypeId, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
        });
    }
  }
}
