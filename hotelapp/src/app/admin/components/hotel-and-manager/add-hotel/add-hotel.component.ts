import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { AddHotel } from 'src/app/shared/models/hotels/add-hotel';
import { selectValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private hotelService: HotelService) {
    this.createForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      stars: new FormControl('0', selectValidator()),
      active: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  isValid(formControlName: string) {
    const formControl = this.createForm.get(formControlName);
    return formControl?.invalid && (formControl?.touched);
  }


  onSubmit() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const addHotel: AddHotel = {
        name: formData.name,
        stars: formData.stars,
      };

      this.hotelService.create(addHotel, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
        if (result.dismiss) {
          this.router.navigate(['/admin', 'managers','create'])
        }
      }, error => {
      });
    }
  }
}
