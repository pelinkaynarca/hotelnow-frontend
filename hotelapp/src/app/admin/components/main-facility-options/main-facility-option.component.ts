import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { MainFacilityOptionService } from 'src/app/services/common/models/main-facility-option.service';
import { AddMainFacilityOption } from 'src/app/shared/models/main-facility-options/add-main-facility-option';
import { ListMainFacilityOption } from 'src/app/shared/models/main-facility-options/list-main-facility-option';
import { UpdateMainFacilityOption } from 'src/app/shared/models/main-facility-options/update-main-facility-option';

@Component({
  selector: 'app-main-facility-option',
  templateUrl: './main-facility-option.component.html',
  styleUrls: ['./main-facility-option.component.scss']
})
export class MainFacilityOptionComponent {
  @ViewChild("mainFacilityOptionForm", { static: true }) mainFacilityOptionForm: NgForm
  listMainFacilityOptions: ListMainFacilityOption[] = [];
  updateOption: UpdateMainFacilityOption;
  showCreateFormFlag: boolean;
  editOptionId: number;
  addOption: AddMainFacilityOption;

  constructor(
    private mainFacilityOptionService: MainFacilityOptionService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    return this.mainFacilityOptionService.getAll().then(mainFacilityOptionData => {
      this.listMainFacilityOptions = mainFacilityOptionData as ListMainFacilityOption[];
    })
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.addOption = { title: '' };
  }

  onSubmit() {
    if (!this.mainFacilityOptionForm.valid) {
      return;
    }

    const formData = this.mainFacilityOptionForm.value;
    const MainFacilityOption: AddMainFacilityOption = {
      title: formData.title
    };

    this.mainFacilityOptionService.create(MainFacilityOption, async () => {
      await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
     
    }, error => {
    }).then(()=>{
      this.getAll();
      this.showCreateFormFlag = false;
    })
  }

  showUpdateForm(mainFacilityOptionId: number) {
    const MainFacilityOptionItem = this.listMainFacilityOptions.find(item => item.id === mainFacilityOptionId);
    if (MainFacilityOptionItem) {
      this.editOptionId = mainFacilityOptionId;
      this.updateOption = {...MainFacilityOptionItem};
      this.showCreateFormFlag = false;
    }
  }

  update(mainFacilityOptionId: number, action: string) {
    if (action === 'check' && this.mainFacilityOptionForm.valid && this.editOptionId !== null) {
      const updateMainFacilityOption: UpdateMainFacilityOption = {
        id: mainFacilityOptionId,
        title: this.updateOption.title
      };

      this.mainFacilityOptionService.update(updateMainFacilityOption, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
          this.editOptionId = null;
        });
    } else if (action === 'cancel') {
      this.editOptionId = null;
    }
    this.getAll();
  }

  async delete(optionId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.mainFacilityOptionService.delete(optionId, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      },
        error => {
        }).then(() => {
          this.getAll();
        });
    }
  }

}
