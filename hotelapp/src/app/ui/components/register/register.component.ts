import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { UserRegister } from 'src/app/shared/models/users/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide: boolean = true;
  isRegister: FormGroup;
  
  constructor(private fb: FormBuilder, private userService: UserService, private sweetAlertService: SweetAlertService,){
    this.isRegister = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      birthDate: new FormControl(null, [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl(null, )
    });
  }

  ngOnInit(): void {
    
  }

  toPassword() {
    this.hide = !this.hide;
  }
  
  onSubmit() {
    if (this.isRegister.valid) {
      const formData = this.isRegister.value;
      const register: UserRegister = {
        role: "CUSTOMER",
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate:  new Date(formData.birthDate),
        phone: formData.phone,
        gender: formData.gender,
        nationalityId: 1
      };
      this.userService.create(register,() => {
         this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
      }, error => {

      });
    }
  }
}
