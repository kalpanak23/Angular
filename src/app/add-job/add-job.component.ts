import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent  {
  jobForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jobService: JobService
  ) {}
  ngOnInit() {   
    this.jobForm = this.formBuilder.group({
    title: ['',Validators.required],
    company_name: ['',Validators.required],
    job_type:['',Validators.required],
    eligibility: ['',Validators.required],
    skills: ['',Validators.required],
    description: ['',Validators.required],
    location: ['',Validators.required],
    contact: ['',[Validators.required ,Validators.pattern('[0-9]+')]],
  });
  console.log('Initial form state:', this.jobForm.status);
}


    addJob() {
      console.log('Form state before submission:', this.jobForm.status);
      if (this.jobForm.valid) {
        const job = this.jobForm.value;
        console.log(job)
        this.jobService.addJob(job).subscribe(
          () => {
            console.log('Job added successfully');
            this.router.navigate(['/job-list']);
          },
          (error) => {
            console.error('Error adding job:', error);
          }
        );     
      }
    }
  }