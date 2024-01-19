// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { JobService } from '../job.service';  
// @Component({
//   selector: 'app-job',
//   templateUrl: './job.component.html',
//   styleUrl: './job.component.css'
// })
// export class JobComponent {
//   job = {
//     title: '',
//     company_name: '',
//     job_type:'',
//     eligibility: '',
//     skills: '',
//     description: '',
//     location: '',
//     contact: ''
//   };
//   constructor(private router: Router, private jobService: JobService) { }
  
//   addJob() {
//     // Assuming jobService has a method to add a job
//     this.jobService.addJob(this.job).subscribe(() => {
//       // After adding the job, navigate to the job list page
//       this.router.navigate(['/job-list']);
//     });
// }
// }