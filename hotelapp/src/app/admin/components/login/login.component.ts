import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserLogin } from 'src/app/shared/models/users/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  hide: boolean = true;
  isLogin: FormGroup;

  constructor(
    private userAuthService: UserAuthService, 
    private fb:FormBuilder,
    private sweetAlertService: SweetAlertService,
    private router: Router){}

  ngOnInit(): void {
    this.isLogin = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login(){
    if (this.isLogin.valid) {
      const formData = this.isLogin.value;
      const register: UserLogin = {
        email: formData.email,
        password: formData.password,
      };
      this.userAuthService.login(register, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if(result.dismiss){
          this.router.navigate(['/admin/hotel'])
        }
      });
    }
  }
  

  toPassword() {
    this.hide = !this.hide;
  }
}
