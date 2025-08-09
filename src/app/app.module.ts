import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  SimpleLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';
import { SimpleLayoutComponent } from './containers/simple-layout/simple-layout.component';
import { InquiryListComponent } from './views/inquiry-list/inquiry-list.component';
import { StudentListComponent } from './views/student-list/student-list.component';
import { ExpenceListComponent } from './views/expence-list/expence-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


import { BlockUIService } from './services/blockui.service';
import { HttpService } from './services/http.service';
import { NotificationService } from './services/notification.service';
import { UtilityService } from './services/utility.service';
import { ObservableDataService } from './services/observable-data.service';
import { LoadingService } from './services/loading.service';
import { LocalStorageService } from './services/localStorage.service';
import { ExcelService } from './services/excel.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';
import { StudentDetailsComponent } from './views/student-details/student-details.component';
import { AllExamsComponent } from './views/all-exams/all-exams.component';
import { ExamDetailsComponent } from './views/exam-details/exam-details.component';
import { FinalExamResultAddComponent } from './views/final-exam-result-add/final-exam-result-add.component';
import { FinalExamResultListComponent } from './views/final-exam-result-list/final-exam-result-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    HttpModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    InquiryListComponent,
    StudentListComponent,
    ExpenceListComponent,
    StudentDetailsComponent,
    AllExamsComponent,
    ExamDetailsComponent,
    FinalExamResultAddComponent,
    FinalExamResultListComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    BlockUIService,
    HttpService,
    NotificationService,
    UtilityService,
    ObservableDataService,
    LoadingService,
    LocalStorageService,
    ExcelService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
