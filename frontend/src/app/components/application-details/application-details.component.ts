import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  application?: Application;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadApplication(id);
    } else {
      this.error = 'Invalid application ID';
      this.isLoading = false;
    }
  }

  loadApplication(id: number): void {
    this.applicationService.getApplication(id).subscribe({
      next: (data) => {
        this.application = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load application details.';
        console.error('Error loading application', error);
        this.isLoading = false;
      }
    });
  }

  deleteApplication(): void {
    if (!this.application) return;
    
    if (confirm('Are you sure you want to delete this application?')) {
      this.isLoading = true;
      this.applicationService.deleteApplication(this.application.id!).subscribe({
        next: () => {
          this.router.navigate(['/applications']);
        },
        error: (error) => {
          this.error = 'Failed to delete application.';
          console.error('Error deleting application', error);
          this.isLoading = false;
        }
      });
    }
  }
}
