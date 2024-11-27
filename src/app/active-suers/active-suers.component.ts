import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-active-suers',
  templateUrl: './active-suers.component.html',
  styleUrl: './active-suers.component.scss'
})
export class ActiveSuersComponent {
  userData: any[] = []; // Initialize as an array
  activeUsers: any[] = []; // Data for the current page
  currentPage = 1; // Current page number
  pageSize = 10; // Number of items per page
  totalUsers = 0; // Total number of users

  constructor(private apiService:LoginServiceService){}
  ngOnInit(): void {
    this.fetch();
  }
  fetch(){
    this.apiService.getData().subscribe({
      next: (response) => {
      this.userData=response.filter((user: { userStatus: string; }) => user.userStatus === 'Active').reverse();
      this.totalUsers=this.userData.length;
      this.paginateData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.activeUsers = this.userData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }
}
