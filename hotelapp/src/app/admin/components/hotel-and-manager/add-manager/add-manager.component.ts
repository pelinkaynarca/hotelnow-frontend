import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { StaffService } from 'src/app/services/admin/staff.service';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { ListHotel } from 'src/app/shared/models/hotels/list-hotel';
import { AddManager } from 'src/app/shared/models/managers/add-manager';
import { selectValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})

export class AddManagerComponent implements OnInit{
  createForm: FormGroup;
  hide: boolean = true;
  listHotels: ListHotel[];
  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    private hotelService: HotelService,
    private staffService: StaffService
  ){
    this.createForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      hotelId: new FormControl('0', selectValidator()),
    });
  }

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel(){
    this.hotelService.getHotelNoStaff().then(data =>{
      this.listHotels = data as ListHotel[];
    })
  }

  onSubmit(){
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const register: AddManager = {
        role: "MANAGER",
        email: formData.email,
        password: formData.password,
        hotelId: formData.hotelId,
        firstName: 'test',
        lastName: 'test',
        gender: 'M',
        phone:'5555555555',
        nationalityId: 1,
        birthDate: new Date('1999-10-17')
        
      };
      this.staffService.addStaffForAdmin(register,() => {
         this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      }, error => {

      });
    }
  }

  isValid(formControlName: string) {
    const formControl = this.createForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }

  
  toPassword() {
    this.hide = !this.hide;
  }
}
