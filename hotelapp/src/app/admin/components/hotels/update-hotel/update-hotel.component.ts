import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetStatus } from 'src/app/base/sweet-alert/sweet-alert-status';
import { SweetAlertService } from 'src/app/services/admin/sweet-alert.service';
import { HotelService } from 'src/app/services/common/models/hotel.service';
import { UpdateHotel } from 'src/app/shared/models/hotels/update-hotel';
import { ListHotelForStaff } from 'src/app/shared/models/hotels/list-hotel-for-staff';
import { ListNeighborhood } from 'src/app/shared/models/neighborhoods/list-neighborhood';
import { NeighborhoodService } from 'src/app/services/common/models/neighborhood.service';
import { ListDistrict } from 'src/app/shared/models/districts/list-district';
import { DistrictService } from 'src/app/services/common/models/district.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { MainFacilitySelectionComponent } from 'src/app/dialogs/main-facility-selection/main-facility-selection.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.scss']
})
export class UpdateHotelComponent implements OnInit {
  updateForm: FormGroup;
  hotel: ListHotelForStaff | null = null;
  neighborhoodList: ListNeighborhood[] = [];
  districtList: ListDistrict[] = [];
  filteredNeighborhoodList: ListNeighborhood[] = [];
  translate: TranslateService;

  constructor(
    private hotelService: HotelService,
    private neighborhoodService: NeighborhoodService,
    private districtService: DistrictService,
    private sweetAlertService: SweetAlertService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    translate: TranslateService,
  ) {
    this.translate = translate;
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
    this.updateForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      address: [null, [Validators.required, Validators.minLength(10)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      checkInTime: [null, [Validators.required]],
      checkOutTime: [null, [Validators.required]],
      districtId: [null, [Validators.required]],
      neighborhoodId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.getHotel();
    this.getDistrictList();
  }

  async getHotel() {
    try {
      const result = await this.hotelService.getHotel();
      if (typeof result === 'string') {
        console.error('Error fetching hotel:', result);
      } else {
        this.hotel = result;
        this.updateForm.patchValue({
          name: result.name,
          stars: result.stars,
          address: result.address,
          description: result.description,
          checkInTime: result.checkInTime,
          checkOutTime: result.checkOutTime,
          neighborhoodId: +result.neighborhoodId
        });
        this.getDistrictIdByNeighborhoodId(result.neighborhoodId);
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  }

  async showMainFacilitySelection() {
    this.dialogService.openDialog({
      componentType: MainFacilitySelectionComponent,
      data: {}
    });
  }

  async getDistrictIdByNeighborhoodId(neighborhoodId: number) {
    try {
      const neighborhood = await this.neighborhoodService.getById(neighborhoodId);
      if (neighborhood && typeof neighborhood !== 'string') {
        this.updateForm.patchValue({ districtId: neighborhood.districtId });
        this.getNeighborhoodList(neighborhood.districtId);
      } else {
        console.error('Error fetching districtId for neighborhoodId:', neighborhoodId);
      }
    } catch (error) {
      console.error('Error fetching districtId by neighborhoodId:', error);
    }
  }

  async getDistrictList() {
    try {
      const result = await this.districtService.getAll();
      if (typeof result === 'string') {
        console.error('Error fetching districts:', result);
      } else {
        this.districtList = result;
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  async getNeighborhoodList(districtId: number) {
    try {
      const result = await this.neighborhoodService.getByDistrictId(districtId);
      if (typeof result === 'string') {
        console.error('Error fetching neighborhoods:', result);
      } else {
        this.neighborhoodList = result;
        this.filteredNeighborhoodList = result;
      }
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
    }
  }

  onDistrictChange(event: any) {
    const selectedDistrictId = event.target.value;
    this.getNeighborhoodList(selectedDistrictId);
    this.updateForm.patchValue({ neighborhoodId: null });
  }

  update() {
    if (this.updateForm.valid && this.hotel) {
      const formData = this.updateForm.value;
      const updatedHotel: UpdateHotel = {
        id: this.hotel.id,
        name: formData.name,
        address: formData.address,
        description: formData.description,
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime,
        neighborhoodId: formData.neighborhoodId
      };

      this.hotelService.update(
        updatedHotel,
        async () => {
          await this.sweetAlertService.showAlert(SweetStatus.sweetSucces);
          this.router.navigate(['/admin/hotel/edit']);
        },
        (error) => {
          console.error('Update hotel error:', error);
        }
      );


      /*
            logValidationErrors(group: FormGroup): void {
              Object.keys(group.controls).forEach((key: string) => {
                const control = group.get(key);
                if (control instanceof FormGroup) {
                  this.logValidationErrors(control);
                } else {
                  if (control && control.invalid) {
                    console.log(`Validation error in field: ${key}, error:`, control.errors);
                  }
                }
              }); 
            } */
    }
  }
}
