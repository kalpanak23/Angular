import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  updatedJob(selectedJob: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/job';
  private selectedJob: any; 
  constructor(private http: HttpClient) { }
  
  setSelectedJob(job: any) {
    this.selectedJob = job;
 }

getSelectedJob() {
    return this.selectedJob;
}

    getJob(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getJob`);
    }

    getJobById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    addJob(job: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addJob`, job);
    }

    updateJob(id: number,updatedJob:any): Observable<any> {
        console.log('Hiiii');
        return this.http.put<any>(`${this.apiUrl}/updateJob/${id}`, updatedJob);
    }

    deleteJob(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteJob/${id}`);
    }
}

