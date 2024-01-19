import { Component,OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent implements OnInit{
  job: any;
  jobListings: any[] = [];
  selectedJob: any = null;
  editForm!: FormGroup;
  updatedJobForm: FormGroup;
  selectedJobId!: number;
  isUpdateFormVisible = false;
  isEditFormVisible = false;

  editingJob: any ;

  editedTitle: string = '';
  editedDescription: string = '';
editedCompanyName: string='';
editedJobType: string='';
editedEligibility: string='';
editedSkills:string='';
editedLocation: string='';
editedContact: string='';

  editedJob: any;

    constructor(
      private jobService: JobService, 
      private formBuilder: FormBuilder,
      private http:HttpClient,
      private route:ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
      ) 
      {        
        this.updatedJobForm = this.formBuilder.group({
          
        title: [''],
        company_name: [''],
        job_type:[''],
        eligibility: [''],
        skills: [''],
        description: [''],
        location: [''],
        contact: [''],
    })
    ;
}
    
    ngOnInit():void {
      // If the route contains data from the add job page, refresh the job list
      this.route.data.subscribe(() => {
        this.loadJobs();
        // this.fetchJobList();
      });
    }
    // fetchJobList() {
    //   this.jobService.getJob().subscribe(
    //     (job) => {
    //       this.jobListings = job;
        
    //     },
    //     (error) => {
    //       console.error('Error fetching job list:', error);
    //     });
    // }
    loadJobs() {
        this.jobService.getJob().subscribe(data => {
          this.jobListings = data;
        },
        (error) => {
          console.error('Error fetching jobs:', error);
        });
    }

    editJob(job: any) {
        // Create a copy of the job object to avoid modifying the original data
        this.editingJob = { ...job };
        console.log('edited',this.editingJob);
        this.isEditFormVisible = true; 
      }
        // this.editedTitle = job.title;
        // this.editedCompanyName=job.company_name;
        // this.editedJobType=job.job_type;
        // this.editedEligibility=job.eligibility;
        // this.editedSkills=job.skills;
        // this.editedDescription = job.description;
        // this.editedLocation=job.location;
        // this.editedContact=job.contact;
        // this.jobService.getJobById(job.id).subscribe(
        //   (existingJob) => {
        //     this.editedJob = { ...existingJob };
        //   },
        //   (error) => {
        //     console.error('Error fetching job details for editing:', error);
        //   }
        // );
      
      
      // saveEditedJob(): void {
      //     if (this.editingJob) {
      //       // Update the job details
      //       this.editingJob.title = this.editedJob.title;
      //       this.editedCompanyName=this.editedJob.company_name;
      //       this.editedJobType=this.editedJob.job_type;
      //       this.editedEligibility=this.editedJob.eligibility;
      //       this.editedSkills=this.editedJob.skills;
      //       this.editingJob.description = this.editedJob.description;
      //       this.editedLocation=this.editedJob.location;
      //       this.editedContact=this.editedJob.contact;
      //       // Save changes to the backend
      //       this.jobService.updateJob(this.editingJob.id, this.editingJob).subscribe(
      //         () => {
      //           console.log('Job updated successfully');
      //           // Clear the editing state
      //           this.editingJob = null;
      //           this.editedTitle = '';
      //           this.editedCompanyName='';
      //           this.editedJobType='';
      //           this.editedEligibility='';
      //           this.editedSkills='';
      //           this.editedDescription = '';
      //           this.editedLocation='';
      //           this.editedContact='';
                
      //           // Reload the job list to reflect changes
      //           this.loadJobs();
      //         },
      //         (error) => {
      //           console.error('Error updating job:', error);
      //         }
      //       );
          // }
        

        // // Set form values based on the selected job
        // this.editForm.setValue({
        //     title: this.selectedJob.title,
        //     company_name: this.selectedJob.company_name,
        //     job_type: this.selectedJob.job_type,
        //     eligibility: this.selectedJob.eligibility,
        //     skills: this.selectedJob.skills,
        //     description: this.selectedJob.description,
        //     location: this.selectedJob.location,
        //     contact: this.selectedJob.contact,
        
        // });
    // }
    
    addJob() {
      // Assuming jobService has a method to add a job
      this.jobService.addJob(this.job).subscribe(() => {
        // After adding the job, navigate to the job list page
        this.router.navigate(['/job-list']);
      });
    }

    cancelEdit() {
      //  this.editingJob={...this.editingJob,location:'',contact:''};
      // this.updatedJobForm.reset();
      this.isEditFormVisible = false;
      // this.updatedJobForm.patchValue({location:'',contact:''});
     
      //   this.updatedJobForm.patchValue(
      //     {location:'',contact:''}  
      //  );
    }
    cancelEdit1() {
      // Clear the selectedJob and reset the form
    //  this.isEditFormVisible = true;
      // this.updatedJobForm.reset();
       //this.updatedJobForm = {...this.updatedJobForm:location:''};
        //  this.updatedJobForm.patchValue({location:'',contact:''});

  }
    updateJob() {
      if (this.updatedJobForm.valid) {
        this.jobService.updateJob(this.editingJob.id, this.updatedJobForm.value).subscribe(
          () => {
            console.log('Job updated successfully');
            const index = this.jobListings.findIndex(job => job.id === this.editingJob.id);
         
            if (index !== -1) {
            this.jobListings[index] = { ...this.jobListings[index], ...this.editingJob };
        }
            // this.fetchJobList(); // Refresh the job list after update
           // Hide the update form
           this.cancelEdit();
            // Show a success message
            this.toastr.success('Job details updated successfully', 'Success');
          },
          error => {
            console.error('Error updating job:', error);
  
            // Show an error message
            this.toastr.error('Error updating job details', 'Error');
          }
        );
      }
    }

    deleteJob(id: number) {
      this.jobService.deleteJob(id).subscribe(
        () => {
          console.log('Job deleted successfully');
          this.jobListings= this.jobListings.filter(u => u.id !== id);
          this.toastr.success('Job deleted successfully', 'Success');
       
          this.router.navigate(['/job-list']);
          // this.fetchJobList();
        },
        (error) => {
          console.error('Error deleting job:', error);
  
         
        }
      );
    }

  }
