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
import { ListCity } from 'src/app/shared/models/cities/list-city';
import { CityService } from 'src/app/services/common/models/city.service';
import { FacilityDetailSelectionComponent } from 'src/app/dialogs/facility-detail-selection/facility-detail-selection.component';
import { HotelImageComponent } from 'src/app/dialogs/hotel-image/hotel-image.component';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.scss']
})
export class UpdateHotelComponent implements OnInit {
  updateForm: FormGroup;
  hotel: ListHotelForStaff | null = null;
  cityList: ListCity[] = [];
  districtList: ListDistrict[] = [];
  neighborhoodList: ListNeighborhood[] = [];
  translate: TranslateService;

  constructor(
    private hotelService: HotelService,
    private neighborhoodService: NeighborhoodService,
    private districtService: DistrictService,
    private cityService: CityService,
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
      description: [null, [Validators.required, Validators.maxLength(800)]],
      checkInTime: [null, [Validators.required]],
      checkOutTime: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      districtId: [null, [Validators.required]],
      neighborhoodId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getHotel();
    this.getCityList();
  }

  async getHotel() {
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
      this.setLocationByNeighborhood(result.neighborhoodId);
    }
  }

  async setLocationByNeighborhood(neighborhoodId: number) {
    try {
      const neighborhood = await this.neighborhoodService.getById(neighborhoodId) as ListNeighborhood;
      const district = await this.districtService.getById(neighborhood.districtId) as ListDistrict;
      const city = await this.cityService.getById(district.cityId) as ListCity;
      this.updateForm.patchValue({
        cityId: city.id,
        districtId: district.id
      });
      this.getDistrictList(city.id);
      this.getNeighborhoodList(district.id);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  }

  async getCityList() {
    try {
      const result = await this.cityService.getAll();
      if (typeof result === 'string') {
        console.error('Error fetching cities:', result);
      } else {
        this.cityList = result;
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  async getDistrictList(cityId: number) {
    try {
      const result = await this.districtService.getByCityId(cityId);
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
      }
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
    }
  }

  onCityChange(event: any) {
    const selectedCityId = event.target.value;
    this.getDistrictList(selectedCityId);
    this.updateForm.patchValue({ districtId: null, neighborhoodId: null });
  }

  onDistrictChange(event: any) {
    const selectedDistrictId = event.target.value;
    this.getNeighborhoodList(selectedDistrictId);
    this.updateForm.patchValue({ neighborhoodId: null });
  }

  update() {
    console.log('Update button clicked');
    console.log('Form Valid:', this.updateForm.valid);
    console.log('Form Value:', this.updateForm.value);

    this.logValidationErrors(this.updateForm);
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
    }
  }

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
  }

  async showMainFacilitySelection() {
    this.dialogService.openDialog({
      componentType: MainFacilitySelectionComponent,
      data: {}
    });
  }

  async showFacilityDetailSelection(hotelId: number) {
    this.dialogService.openDialog({
      componentType: FacilityDetailSelectionComponent,
      data: { hotelId }
    });
  }

  async showPhotos(hotelId: number) {
    this.dialogService.openDialog({
      componentType: HotelImageComponent,
      data: { hotelId },
    });
  }

}
