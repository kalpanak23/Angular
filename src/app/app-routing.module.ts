import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';
// import { JobComponent } from './job/job.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'job-list',component:JobListComponent},
  {path: 'add-job', component: AddJobComponent },
  // {path:'job',component:JobComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
