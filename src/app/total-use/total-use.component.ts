import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserService } from '../services/add-user.service';
import { successAlert } from '../utils/alerts.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-use',
  templateUrl: './total-use.component.html',
  styleUrls: ['./total-use.component.scss']
})
export class TotalUseComponent implements OnInit {
  userData: any[] = [];
  filteredData: any[] = [];
  activeUsers: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;
  searchTerm = new Subject<string>();

  constructor(private apiService: LoginServiceService,public modalService:NgbModal,public userService:AddUserService,public router:Router) {}

  ngOnInit(): void {
    this.fetch();
    this.searchTerm.pipe(
      debounceTime(300), // Wait for 300ms pause in typing
      distinctUntilChanged() // Ignore if the next search term is the same as the previous
    ).subscribe((term: string) => {
      this.filterData(term);
    });
  }

  fetch(): void {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.userData = response.reverse();
        this.filteredData = [...this.userData];
        this.totalUsers = this.filteredData.length;
        this.paginateData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  filterData(term: string): void {
    if (term.trim() === '') {
      this.filteredData = [...this.userData];
    } else {
      this.filteredData = this.userData.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    this.totalUsers = this.filteredData.length;
    this.currentPage = 1;
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.activeUsers = this.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }

  openModal() {
    const modalRef = this.modalService.open(AddNewUserComponent, { centered: true });
    modalRef.componentInstance.modalTitle = 'User Information';
    modalRef.result
    .then((formData) => {
      if (formData) {
        this.userService.addUser(formData).subscribe({
          next: (response) => {
           successAlert('User added successfully!','success')
            this.fetch();
          },
          error: (err) => {
            console.error('Error adding user:', err);
            alert('Failed to add user.');
          },
        });
      }
    })
    .catch((error) => {
      console.log('Modal dismissed:', error);
    });
}

deleteRecord(userId: string) {
  // SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this record!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, proceed with deletion
      this.apiService.deleteusers(userId).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.fetch(); // Refresh the table
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          Swal.fire('Error!', 'Failed to delete the user.', 'error');
        },
      });
    }
  });
}
}
