import { Component, OnInit } from '@angular/core';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { StaffService } from 'src/app/services/admin/staff.service';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { BaseResponse } from 'src/app/shared/models/BaseResponse';
import { ListStaff } from 'src/app/shared/models/staffs/list-staff';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss'],
})
export class ListStaffComponent implements OnInit {
  staffs: ListStaff[] = [];

  constructor(
    private staffService: StaffService,
    private sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit(): void {
    this.getStaffsOfHotel();
  }

  getStaffsOfHotel() {
    this.staffService.getStaffsOfHotel().then((baseResponse) => {
      this.staffs = baseResponse.result;
    },
    (reason)=>{
      console.log(reason);
    });
  }

  async delete(id: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.staffService.delete(id).then((response:BaseResponse<string> | void)=>{
        this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        this.getStaffsOfHotel();
      });
    }
  }

  onDeleted(response: BaseResponse<string> | void) {
  }

  onDeleteError(response: string) {
    // console.log(response);
  }
}
