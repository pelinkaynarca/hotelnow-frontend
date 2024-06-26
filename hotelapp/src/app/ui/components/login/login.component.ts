import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { UserLogin } from 'src/app/shared/models/users/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isLogin: FormGroup;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder, 
    private userAuthService:UserAuthService, 
    private router: Router, 
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
  ){
    this.isLogin = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    
  }


  toPassword() {
    this.hide = !this.hide;
  }
  
  async login() {
  //   if (this.isLogin.valid) {
  //     const formData = this.isLogin.value;
  //     const login: UserLogin = {
  //       email: formData.email,
  //       password: formData.password,
  //     };
  //   await this.userAuthService.login(login, () => {
  //     this.authService.identityCheck();

  //     this.activatedRoute.queryParams.subscribe(params => {
  //       const returnUrl: string = params["returnUrl"];
  //       if (returnUrl)
  //         this.router.navigate([returnUrl]);
  //     });
  //   });
  // }
}
}