import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { SimpleLayoutComponent } from './containers/simple-layout/simple-layout.component';

import { P404Component } from './views/error/404.component';
import { ExpenceListComponent } from './views/expence-list/expence-list.component';
import { InquiryListComponent } from './views/inquiry-list/inquiry-list.component';
import { StudentDetailsComponent } from './views/student-details/student-details.component';
import { StudentListComponent } from './views/student-list/student-list.component';
import { AllExamsComponent } from './views/all-exams/all-exams.component';
import { ExamDetailsComponent } from './views/exam-details/exam-details.component';
import { FinalExamResultListComponent } from './views/final-exam-result-list/final-exam-result-list.component';
import { FinalExamResultAddComponent } from './views/final-exam-result-add/final-exam-result-add.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'all-inquiries',
        component: InquiryListComponent,
        data: {
          title: 'All Inquiries'
        }
      },
      {
        path: 'all-students',
        component: StudentListComponent,
        data: {
          title: 'All Students'
        }
      },
      {
        path: 'all-expences',
        component: ExpenceListComponent,
        data: {
          title: 'All Expences'
        }
      },
      {
        path: 'all-students/student-details/:id',
        component: StudentDetailsComponent,
        data: {
          title: 'All Students / Student Details'
        }
      },
      {
        path: 'all-exams',
        component: AllExamsComponent,
        data: {
          title: 'All Exams'
        }
      },
      {
        path: 'all-exams/exam-details/:id',
        component: ExamDetailsComponent,
        data: {
          title: 'All Exams / Exam Details'
        }
      },
      {
        path: 'final-exam-results',
        component: FinalExamResultListComponent,
        data: {
          title: 'Final Exam Results'
        }
      },
      {
        path: 'final-exam-results/add-details/:id',
        component: FinalExamResultAddComponent,
        data: {
          title: 'Final Exam Results / Add Details'
        }
      },
      // {
      //   path: 'user-management',
      //   loadChildren: () => import('./views/user-management/user-management.module').then(m => m.UserManagementModule)
      // }
    ]
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login Page'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
