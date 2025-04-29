import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];
  displayedColumns: string[] = ['company', 'position', 'status', 'appliedDate', 'actions'];
  isLoading = true;
  error = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.applicationService.getApplications()
      .subscribe({
        next: (data) => {
          this.applications = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Failed to load applications. Please try again later.';
          console.error('Error loading applications', error);
          this.isLoading = false;
        }
      });
  }

  deleteApplication(id: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(id)
        .subscribe({
          next: () => {
            this.loadApplications();
          },
          error: (error) => {
            this.error = 'Failed to delete application.';
            console.error('Error deleting application', error);
          }
        });
    }
  }
}
