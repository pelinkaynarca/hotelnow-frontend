import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { UiRoutingModule } from './ui/ui-routing.module';
import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UiRoutingModule,
    UiModule,
    AdminModule,
    AdminRoutingModule,
  ],
  providers: [
    {provide:'baseUrl', useValue:environment.apiUrl, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
