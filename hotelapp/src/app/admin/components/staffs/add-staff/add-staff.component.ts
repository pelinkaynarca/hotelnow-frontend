import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { StaffService } from 'src/app/services/admin/staff.service';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { AddStaff } from 'src/app/shared/models/staffs/add-staff';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
  createForm: FormGroup;

  constructor(private staffService: StaffService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm = this.fb.group({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("^$|[0-9]{10}")]),
      birthDate: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required])
    });
  }

  create() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const addStaffRequest: AddStaff = {
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        password:formData.password,
        phone:formData.phone,
        birthDate:formData.birthDate,
        gender:formData.gender
      };
      this.staffService.create(addStaffRequest, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate(['/admin', 'staffs']);
        }
      }, error => {
      });
    }
  }
}
