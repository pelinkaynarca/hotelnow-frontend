import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { selectValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit{
  createForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private hotelService: HotelService
  ){
    this.createForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl(null, [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl(null, selectValidator()),
      hotelId: new FormControl('0', selectValidator())
    });
  }

  ngOnInit(): void {
    
  }

  getHotel(){

  }

  onSubmit(){

  }

  isValid(formControlName: string) {
    const formControl = this.createForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }

  
  toPassword() {
    this.hide = !this.hide;
  }
}
