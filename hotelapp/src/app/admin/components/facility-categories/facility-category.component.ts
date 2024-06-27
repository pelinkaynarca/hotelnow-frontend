import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { FacilityCategoryService } from 'src/app/services/common/models/facility-category.service';
import { AddFacilityCategory } from 'src/app/shared/models/facility-categories/add-facility-category';
import { ListFacilityCategory } from 'src/app/shared/models/facility-categories/list-facility-category';
import { UpdateFacilityCategory } from 'src/app/shared/models/facility-categories/update-facility-category';

@Component({
  selector: 'app-facility-category',
  templateUrl: './facility-category.component.html',
  styleUrls: ['./facility-category.component.scss']
})
export class FacilityCategoryComponent{
  @ViewChild("facilityCategoryForm", { static: true }) facilityCategoryForm: NgForm
  listFacilityCategories: ListFacilityCategory[] = [];
  updateCategory: UpdateFacilityCategory;
  showCreateFormFlag: boolean;
  editCategoryId: number;
  addCategory: AddFacilityCategory;

  constructor(
    private facilityCategoryService: FacilityCategoryService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    return this.facilityCategoryService.getAll().then(facilityCategoryData => {
      this.listFacilityCategories = facilityCategoryData as ListFacilityCategory[];
    })
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.addCategory = { title: '' };
  }

  onSubmit() {
    if (!this.facilityCategoryForm.valid) {
      return;
    }

    const formData = this.facilityCategoryForm.value;
    const FacilityCategory: AddFacilityCategory = {
      title: formData.title
    };

    this.facilityCategoryService.create(FacilityCategory, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
     
    }, error => {
    }).then(()=>{
      this.getAll();
      this.showCreateFormFlag = false;
    })
  }

  showUpdateForm(facilityCategoryId: number) {
    const FacilityCategoryItem = this.listFacilityCategories.find(item => item.id === facilityCategoryId);
    if (FacilityCategoryItem) {
      this.editCategoryId = facilityCategoryId;
      this.updateCategory = {...FacilityCategoryItem};
      this.showCreateFormFlag = false;
    }
  }

  update(facilityCategoryId: number, action: string) {
    if (action === 'check' && this.facilityCategoryForm.valid && this.editCategoryId !== null) {
      const updateFacilityCategory: UpdateFacilityCategory = {
        id: facilityCategoryId,
        title: this.updateCategory.title
      };

      this.facilityCategoryService.update(updateFacilityCategory, () => {
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
      this.facilityCategoryService.delete(categoryId, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
        });
    }
  }
}

