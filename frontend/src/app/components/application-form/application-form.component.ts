import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  isEditMode = false;
  applicationId?: number;
  isLoading = false;
  error = '';
  statusOptions = [
    'Applied', 
    'Phone Screen', 
    'Interview', 
    'Technical Interview', 
    'Offer', 
    'Rejected', 
    'Accepted'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode
    this.applicationId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !isNaN(this.applicationId);
    
    if (this.isEditMode && this.applicationId) {
      this.loadApplication(this.applicationId);
    }
  }

  initForm(): void {
    this.applicationForm = this.fb.group({
      company: ['', [Validators.required, Validators.maxLength(100)]],
      position: ['', [Validators.required, Validators.maxLength(100)]],
      status: ['Applied', [Validators.required]],
      appliedDate: [new Date(), [Validators.required]]
    });
  }

  loadApplication(id: number): void {
    this.isLoading = true;
    this.applicationService.getApplication(id).subscribe({
      next: (application) => {
        this.applicationForm.patchValue({
          company: application.company,
          position: application.position,
          status: application.status,
          appliedDate: new Date(application.appliedDate)
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load application details.';
        console.error('Error loading application', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.applicationForm.invalid) {
      return;
    }

    this.isLoading = true;
    const applicationData = this.applicationForm.value;

    if (this.isEditMode && this.applicationId) {
      this.applicationService.updateApplication(this.applicationId, applicationData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/applications']);
        },
        error: (error) => {
          this.error = 'Failed to update application.';
          console.error('Error updating application', error);
          this.isLoading = false;
        }
      });
    } else {
      this.applicationService.createApplication(applicationData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/applications']);
        },
        error: (error) => {
          this.error = 'Failed to create application.';
          console.error('Error creating application', error);
          this.isLoading = false;
        }
      });
    }
  }
}
