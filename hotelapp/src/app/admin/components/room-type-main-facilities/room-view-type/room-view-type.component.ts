import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomViewTypeService } from 'src/app/services/common/models/room-view-type.service';
import { AddRoomViewType } from 'src/app/shared/models/room-view-types/add-room-view-type';
import { ListRoomViewType } from 'src/app/shared/models/room-view-types/list-room-view-type';
import { UpdateRoomViewType } from 'src/app/shared/models/room-view-types/update-room-view-type';

@Component({
  selector: 'app-room-view-type',
  templateUrl: './room-view-type.component.html',
  styleUrls: ['./room-view-type.component.scss']
})
export class RoomViewTypeComponent {
  @ViewChild("viewTypeForm", { static: true }) viewTypeForm: NgForm
  listViewTypes: ListRoomViewType[] = [];
  updateViewType: UpdateRoomViewType;
  showCreateFormFlag: boolean;
  editViewTypeId: number;
  addViewType: AddRoomViewType;

  constructor(
    private roomViewTypeService: RoomViewTypeService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    return this.roomViewTypeService.getAll().then(viewTypesData => {
      this.listViewTypes = viewTypesData as ListRoomViewType[];
    })
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.addViewType = { name: '' };
  }

  onSubmit() {
    if (!this.viewTypeForm.valid) {
      return;
    }

    const formData = this.viewTypeForm.value;
    const ViewType: AddRoomViewType = {
      name: formData.name
    };

    this.roomViewTypeService.create(ViewType, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
     
    }, error => {
    }).then(()=>{
      this.getAll();
      this.showCreateFormFlag = false;
    })
  }

  showUpdateForm(viewTypeId: number) {
    const ViewTypeItem = this.listViewTypes.find(item => item.id === viewTypeId);
    if (ViewTypeItem) {
      this.editViewTypeId = viewTypeId;
      this.updateViewType = {...ViewTypeItem};
      this.showCreateFormFlag = false;
    }
  }

  update(viewTypeId: number, action: string) {
    if (action === 'check' && this.viewTypeForm.valid && this.editViewTypeId !== null) {
      const updateViewType: UpdateRoomViewType = {
        id: viewTypeId,
        name: this.updateViewType.name
      };

      this.roomViewTypeService.update(updateViewType, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
          this.editViewTypeId = null;
        });
    } else if (action === 'cancel') {
      this.editViewTypeId = null;
    }
    this.getAll();
  }

  async delete(viewTypeId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.roomViewTypeService.delete(viewTypeId, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
        });
    }
  }
}
