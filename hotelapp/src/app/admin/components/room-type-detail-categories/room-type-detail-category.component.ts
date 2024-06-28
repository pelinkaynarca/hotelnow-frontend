import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { RoomTypeDetailCategoryService } from 'src/app/services/common/models/room-type-detail-category.service';
import { AddRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/add-room-type-detail-category';
import { ListRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/list-room-type-detail-category';
import { UpdateRoomTypeDetailCategory } from 'src/app/shared/models/room-type-detail-categories/update-room-type-detail-category';

@Component({
  selector: 'app-room-type-detail-category',
  templateUrl: './room-type-detail-category.component.html',
  styleUrls: ['./room-type-detail-category.component.scss']
})
export class RoomTypeDetailCategoryComponent {
  @ViewChild("roomTypeDetailCategoryForm", { static: true }) roomTypeDetailCategoryForm: NgForm
  listRoomTypeDetailCategories: ListRoomTypeDetailCategory[] = [];
  updateCategory: UpdateRoomTypeDetailCategory;
  showCreateFormFlag: boolean;
  editCategoryId: number;
  addCategory: AddRoomTypeDetailCategory;

  constructor(
    private roomTypeDetailCategoryService: RoomTypeDetailCategoryService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    return this.roomTypeDetailCategoryService.getAll().then(roomTypeDetailCategoryData => {
      this.listRoomTypeDetailCategories = roomTypeDetailCategoryData as ListRoomTypeDetailCategory[];
    })
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.addCategory = { title: '' };
  }

  onSubmit() {
    if (!this.roomTypeDetailCategoryForm.valid) {
      return;
    }

    const formData = this.roomTypeDetailCategoryForm.value;
    const RoomTypeDetailCategory: AddRoomTypeDetailCategory = {
      title: formData.title
    };

    this.roomTypeDetailCategoryService.create(RoomTypeDetailCategory, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
     
    }, error => {
    }).then(()=>{
      this.getAll();
      this.showCreateFormFlag = false;
    })
  }

  showUpdateForm(roomTypeDetailCategoryId: number) {
    const RoomTypeDetailCategoryItem = this.listRoomTypeDetailCategories.find(item => item.id === roomTypeDetailCategoryId);
    if (RoomTypeDetailCategoryItem) {
      this.editCategoryId = roomTypeDetailCategoryId;
      this.updateCategory = {...RoomTypeDetailCategoryItem};
      this.showCreateFormFlag = false;
    }
  }

  update(roomTypeDetailCategoryId: number, action: string) {
    if (action === 'check' && this.roomTypeDetailCategoryForm.valid && this.editCategoryId !== null) {
      const updateRoomTypeDetailCategory: UpdateRoomTypeDetailCategory = {
        id: roomTypeDetailCategoryId,
        title: this.updateCategory.title
      };

      this.roomTypeDetailCategoryService.update(updateRoomTypeDetailCategory, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
          this.editCategoryId = null;
        });
    } else if (action === 'cancel') {
      this.editCategoryId = null;
    }
    this.getAll();
  }

  async delete(categoryId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.roomTypeDetailCategoryService.delete(categoryId, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
        });
    }
  }

}
